const resizeBtn = document.querySelector("[data-resize-btn]");

resizeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.body.classList.toggle("sb-expanded");
});


document.forms[0].querySelectorAll("button")[0].addEventListener("click", (event) => {
    event.preventDefault();

    const newDiv = document.createElement('div');
    const newInput = document.createElement('input');
    newInput.type = 'text';
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'bx bx-trash';
    deleteButton.appendChild(deleteIcon);

    deleteButton.addEventListener('click', () => {
        newDiv.remove();
    });

    newDiv.appendChild(newInput);
    newDiv.appendChild(deleteButton);
    document.querySelector('.checks').appendChild(newDiv);
});

document.forms[0].querySelectorAll("button")[1].addEventListener("click", (event) => {
    event.preventDefault();

    document.querySelectorAll('pre').forEach(pre => {
        pre.remove();
    });

    const inputs = document.forms[0].querySelectorAll(".checks input[type='text']");
    const values = Array.from(inputs).map(input => input.value);
    const fileName = document.forms[0].querySelectorAll("input[type='text']")[0].value
    let testName = document.forms[0].querySelectorAll("input[type='text']")[1].value;
    testName = testName.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');

    const templateBlastTest = `public function test${testName}(): void
{
    $mogelijke_antwoorden = [
        ${values.map(value => '"' + value + '"').join(',\n        ')}
    ];
    $studentContent = shell_exec('php -w ' . getenv('SOURCE_DIR') . '${fileName}');
    $studentContent = preg_replace('/\s+/', '', $studentContent);

    $found = false;
    foreach ($mogelijke_antwoorden as $answer) {
        $strippedAnswer = preg_replace('/\s+/', '', $answer);
        if (strpos($studentContent, $strippedAnswer) !== false) {
            $found = true;
            break;
        }
    }

    $this->assertTrue($found);
} `;

    const pre = document.createElement('pre');
    pre.addEventListener('click', () => {
        navigator.clipboard.writeText(templateBlastTest);

        const alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.textContent = 'Blasttest has been copied to your clipboard';
        document.body.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 3000);
    });
    pre.textContent = templateBlastTest;
    document.querySelector('main').appendChild(pre);
});

