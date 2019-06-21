export function getDatabase(fn, done) {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exomultpars&format=json', true);
    xhr.onprogress = function (e) {
        fn(Math.trunc(e.loaded / 1024));
    };
    xhr.onloadend = function() {
        done(JSON.parse(xhr.response))
    };

    xhr.send();
}