window.addEventListener('message', function(event) {
// For security, check where it came from
console.log('Got message from:', event.origin);
console.log('Data:', event.data);
let url = event.data.href;

if (event.data.type === 'iframe-location') {
    console.log('Iframe is now at:', event.data.href);
}
});
