document.addEventListener("DOMContentLoaded", function(){
    cssPropWrite();
    getCurrentYear();
    truncate();

/* <![CDATA[ */
( function( $ ) {
    $( 'a[href="#"]' ).click( function(e) {
        e.preventDefault();
    } );
} )( jQuery );
/* ]]> */
});
  
function cssPropWrite() {
    document.documentElement.style
    .setProperty('--set-color-base', 'rgb(206, 205, 195)');

    document.documentElement.style
    .setProperty('--set-color-base-light', 'rgb(40, 39, 38)');

    document.documentElement.style
    .setProperty('--set-color-base-tint', 'rgb(16, 15, 15)');

    document.documentElement.style
    .setProperty('--set-color-primary', 'rgb(218, 112, 44)');

    document.documentElement.style
    .setProperty('--set-color-primary-shade', 'rgb(188, 82, 21)');

    document.documentElement.style
    .setProperty('--set-color-secondary', 'rgb(139, 126, 200)');

    document.documentElement.style
    .setProperty('--set-color-secondary-shade', 'rgb(94, 64, 157)');
    
    document.documentElement.style
    .setProperty('--add-font-sans', 'Archivo Black');

    document.documentElement.style
    .setProperty('--add-font-serif', 'PT Sans');

    document.documentElement.style
    .setProperty('--add-font-mono', 'Cousine');
}

function getCurrentYear() {
    $("#getCurrentYear").html(new Date().getFullYear());
}

function truncate() {
    shave('.truncate', 150);
}