
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
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";

    const lines = text.split(/\r?\n/);
    for (let line of lines) {
        line = line.trim();
        if (line.startsWith('!F S')) {
            const parts = line.split(/\s+/);
            const y = parseInt(parts[3]);
            const x = parseInt(parts[4]);
            const h = parseInt(parts[6]);
            const w = parseInt(parts[7]);
            const textMatch = line.match(/"(.*)"/);
            const txt = textMatch ? textMatch[1] : "???";

            ctx.font = `${h}px Arial`;
            ctx.fillText(txt, x / 3, y / 3); // Divisé pour adapter à canvas
        }

        if (line.startsWith('!F G')) {
            const parts = line.split(/\s+/);
            const y = parseInt(parts[3]);
            const x = parseInt(parts[4]);
            const nameMatch = line.match(/"(.*)"/);
            const label = nameMatch ? nameMatch[1] : "Logo";

            ctx.fillStyle = 'blue';
            ctx.fillText("[LOGO: " + label + "]", x / 3, y / 3);
        }

        if (line.startsWith('!F C')) {
            const parts = line.split(/\s+/);
            const y = parseInt(parts[3]);
            const x = parseInt(parts[4]);
            const textMatch = line.match(/"(.*)"/);
            const txt = textMatch ? textMatch[1] : "BARCODE";

            ctx.fillStyle = 'darkgreen';
            ctx.fillRect(x / 3, y / 3, 200, 40); // Représentation visuelle fictive
            ctx.fillStyle = 'white';
            ctx.fillText(txt, x / 3 + 5, y / 3 + 25);
        }
    }
}
