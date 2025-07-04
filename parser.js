const fileInput = document.getElementById('fileInput');
const output = document.getElementById('output');
const canvas = document.getElementById('preview');
const ctx = canvas.getContext('2d');

fileInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        const content = evt.target.result;
        output.textContent = content;
        renderLBL(content);
    };
    reader.readAsText(file);
});

function renderLBL(text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const lines = text.split(/\r?\n/);

    let y = 20;
    for (let line of lines) {
        if (line.includes('!L G')) {
            ctx.fillStyle = 'black';
            ctx.fillText('🖼 Logo: ' + (line.split('"')[1] || ''), 20, y);
            y += 20;
        } else if (line.startsWith('!V')) {
            const h = parseInt(line.replace('!V', '').trim());
            ctx.fillStyle = 'blue';
            ctx.fillText('Canvas height hint: ' + h, 20, y);
            y += 20;
        } else if (line.startsWith('!C')) {
            ctx.fillStyle = 'green';
            ctx.fillText('Centering or Command: ' + line, 20, y);
            y += 20;
        } else if (line.trim() !== '') {
            ctx.fillStyle = 'gray';
            ctx.fillText(line, 20, y);
            y += 20;
        }
    }
}
