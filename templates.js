// templates.js

export function generatePhpTemplate(testName, fileName, values) {
    return `public function test${testName}(): void
{
    $mogelijke_antwoorden = [
        ${values.map(value => '"' + value + '"').join(',\n        ')}
    ];
    $studentContent = shell_exec('php -w ' . getenv('SOURCE_DIR') . '${fileName}');
    $studentContent = preg_replace('/\\s+/', '', $studentContent);

    $found = false;
    foreach ($mogelijke_antwoorden as $answer) {
        $strippedAnswer = preg_replace('/\\s+/', '', $answer);
        if (strpos($studentContent, $strippedAnswer) !== false) {
            $found = true;
            break;
        }
    }

    $this->assertTrue($found);
}`;
}

export function generateNodeTemplate(testName, fileName, values) {
    return `const assert = require('assert');
const { execSync } = require('child_process');

describe('${testName}', function() {
    it('should pass the test', function() {
        const possibleAnswers = [
            ${values.map(value => '`' + value + '`').join(',\n            ')}
        ];
        let studentContent = execSync('node ${fileName}').toString().replace(/\\s+/g, '');

        const found = possibleAnswers.some(answer => studentContent.includes(answer.replace(/\\s+/g, '')));

        assert.strictEqual(found, true);
    });
});`;
}

export function generateCSharpTemplate(testName, fileName, values) {
    return `using NUnit.Framework;
using System.Diagnostics;

[TestFixture]
public class ${testName}Tests
{
    [Test]
    public void Test${testName}()
    {
        var possibleAnswers = new[]
        {
            ${values.map(value => '"' + value + '"').join(',\n            ')}
        };
        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = "dotnet",
                Arguments = "run --project " + "${fileName}",
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true,
            }
        };

        process.Start();
        string studentContent = process.StandardOutput.ReadToEnd().Replace("\\s+", "");

        bool found = false;
        foreach (var answer in possibleAnswers)
        {
            if (studentContent.Contains(answer.Replace("\\s+", "")))
            {
                found = true;
                break;
            }
        }

        Assert.IsTrue(found);
    }
}`;
}

export function generatePythonTemplate(testName, fileName, values) {
    return `import subprocess
import re
import unittest

class Test${testName}(unittest.TestCase):
    def test_${testName}(self):
        possible_answers = [
            ${values.map(value => '"' + value + '"').join(',\n            ')}
        ]
        student_content = subprocess.check_output(['python', '${fileName}']).decode('utf-8')
        student_content = re.sub(r'\\s+', '', student_content)

        found = any(re.sub(r'\\s+', '', answer) in student_content for answer in possible_answers)

        self.assertTrue(found)

if __name__ == '__main__':
    unittest.main()`;
}
