function createTable() {
    let table = document.createElement('table');
    let tr = table.appendChild(document.createElement('tr'));
    tr.appendChild(document.createElement('th')).innerText = 'Codec';
    tr.appendChild(document.createElement('th')).innerText = 'MIME';
    tr.appendChild(document.createElement('th')).innerText = 'canPlayType';
    tr.appendChild(document.createElement('th')).innerText = 'isTypeSupported';
    tr.appendChild(document.createElement('th')).innerText = 'mediaCapabilities';
    return table;
}

function appendTableRow(table, name, mime, canPlayType, isTypeSupported, mediaCapabilities, url)
{
    let tr = table.appendChild(document.createElement('tr'));

    nameCell = tr.appendChild(document.createElement('td'));
    nameCell.innerText = name;

    mimeCell = tr.appendChild(document.createElement('td'));
    mimeCell.innerText = mime;

    let canPlayTypeCell = tr.appendChild(document.createElement('td'));
    if (canPlayType === '')
        canPlayType = 'not supported';
    canPlayTypeCell.innerText = canPlayType;
    canPlayTypeCell.classList.add(canPlayType === 'not supported' ? 'not-supported' : 'supported')

    let isTypeSupportedCell = tr.appendChild(document.createElement('td'));
    isTypeSupportedCell.innerText = isTypeSupported ? 'supported' : 'not supported';
    isTypeSupportedCell.classList.add(isTypeSupported ? 'supported' : 'not-supported')

    let mediaCapabilitiesCell = tr.appendChild(document.createElement('td'));
    if (url)
        mediaCapabilitiesCell.innerHTML = `<a href="${url}">${mediaCapabilities ? 'supported' : 'not supported'}</a>`;
    else
        mediaCapabilitiesCell.innerText = mediaCapabilities ? 'supported' : 'not supported';
    mediaCapabilitiesCell.classList.add(mediaCapabilities ? 'supported' : 'not-supported')
}

function runTest(results) {
    results.appendChild(document.createElement('h3')).innerText = 'Audio Codecs:'
    let audioTable = results.appendChild(createTable());
    let audio = new Audio();

    let MediaSource = window.MediaSource ?? window.ManagedMediaSource;

    audioCodecs.forEach(async audioCodec => {
        let mime = `audio/${audioCodec.container}; codecs="${audioCodec.codec}"`
        let canPlayType = audio.canPlayType(mime);
        let isTypeSupported = MediaSource.isTypeSupported(mime);

        let configuration = { 
            type: 'file',
            audio: {
                contentType: mime,
            },
        };

        let mediaCapabilities = await navigator.mediaCapabilities.decodingInfo(configuration);

        let url = `../media-capabilities/?configuration=${encodeURI(JSON.stringify(configuration))}`;

        appendTableRow(audioTable, audioCodec.name, `"${audioCodec.codec}"`, canPlayType, isTypeSupported, mediaCapabilities.supported, url);
    });

    results.appendChild(document.createElement('h3')).innerText = 'Video Codecs:'
    let videoTable = results.appendChild(createTable());
    let video = document.createElement('video');
    videoCodecs.forEach(async videoCodec => {
        let mime = `video/${videoCodec.container}; codecs="${videoCodec.codec}"`
        let canPlayType = video.canPlayType(mime);
        let isTypeSupported = MediaSource.isTypeSupported(mime);

        let configuration = { 
            type: 'file',
            video: {
                contentType: mime,
                width: videoCodec.width,
                height: videoCodec.height,
                bitrate: videoCodec.bitrate,
                framerate: videoCodec.frameRate,
            },
        };
        let url = `../media-capabilities/?configuration=${encodeURI(JSON.stringify(configuration))}`;

        let mediaCapabilities = await navigator.mediaCapabilities.decodingInfo(configuration);
        appendTableRow(videoTable, videoCodec.name, `"${videoCodec.codec}"`, canPlayType, isTypeSupported, mediaCapabilities.supported, url);
    });
}