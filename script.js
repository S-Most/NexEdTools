import {
    generatePhpTemplate,
    generateNodeTemplate,
    generateCSharpTemplate,
    generatePythonTemplate
} from './templates.js';

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
    const language = document.getElementById("language").value;

    let templateBlastTest = '';

    switch (language) {
        case 'php':
            templateBlastTest = generatePhpTemplate(testName, fileName, values);
            break;
        case 'node':
            templateBlastTest = generateNodeTemplate(testName, fileName, values);
            break;
        case 'csharp':
            templateBlastTest = generateCSharpTemplate(testName, fileName, values);
            break;
        case 'python':
            templateBlastTest = generatePythonTemplate(testName, fileName, values);
            break;
        default:
            alert('Please select a valid programming language.');
            return;
    }

    const pre = document.createElement('pre');
    pre.addEventListener('click', () => {
        navigator.clipboard.writeText(templateBlastTest);

        const alert = document.createElement('div');
        alert.className = 'alert alert-success';
        alert.textContent = 'BlastTest has been copied to your clipboard';
        document.body.appendChild(alert);
        setTimeout(() => {
            alert.remove();
        }, 3000);
    });
    pre.textContent = templateBlastTest;
    document.querySelector('main').appendChild(pre);
});
