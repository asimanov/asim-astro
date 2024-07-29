document.addEventListener("DOMContentLoaded", function(){
    cssPropWrite();
});
  
function cssPropWrite() {  
    document.documentElement.style
    .setProperty('--add-font-sans', 'Archivo Black');

    document.documentElement.style
    .setProperty('--add-font-serif', 'PT Sans');

    document.documentElement.style
    .setProperty('--add-font-mono', 'Cousine');

    document.documentElement.style
    .setProperty('--set-color-primary', 'var(--set-color-red)');

    document.documentElement.style
    .setProperty('--set-color-secondary', 'var(--set-color-blue)');
}