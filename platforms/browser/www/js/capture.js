
//*********************************************************
// Capture Capabilities
//*********************************************************
function updateCaptureStatus(status) {
    //$$("#captureStatus").html(status);
}

function clearDisplayStatus() {
    $$("#captureProperties").css("display", "none");
   // $$("#captureProperties").empty();
    //$$("#captureStatus").empty();
}

function goCapture(captureType) {
    $$("#captureProperties").html("Capture - " + captureType + "");

    function captureSuccess(mediaFiles) {
        var i, len;
        var mediaDetails = "";

        for (i = 0, len=mediaFiles.length; i < len; i++) {
            mediaDetails += addGridRow("a", boldLabel("File full path:"));
            mediaDetails += addGridRow("b", textFormat(mediaFiles[i].fullPath));

            mediaDetails += addGridRow("a", boldLabel("Type:"));
            mediaDetails += addGridRow("b", textFormat(mediaFiles[i].type));

            mediaDetails += addGridRow("a", boldLabel("Last modified:"));
            mediaDetails += addGridRow("b", toDateStr(new Date(mediaFiles[i].lastModifiedDate)));

            mediaDetails += addGridRow("a", boldLabel("Size:"));
            mediaDetails += addGridRow("b", textFormat(mediaFiles[i].size));
        }
        $("#captureProperties").css("display", "block");
        //$("#captureProperties").append(mediaDetails).trigger("create");
        $("#captureProperties").html(mediaDetails);

        updateCaptureStatus("SUCCESS: "  + captureType.slice(0,1).toUpperCase() + captureType.slice(1) + " captured");
    }

    function captureError(error) {
        var errors = {};
        errors[CaptureError.CAPTURE_INTERNAL_ERR]     = 'Camera or microphone failed to capture image or sound.';
        errors[CaptureError.CAPTURE_APPLICATION_BUSY] = 'Camera application or audio capture application is currently serving other capture request.';
        errors[CaptureError.CAPTURE_INVALID_ARGUMENT] = 'Invalid use of the API (e.g. limit parameter has value less than one).';
        errors[CaptureError.CAPTURE_NO_MEDIA_FILES]   = 'User exited camera application or audio capture application before capturing anything.';
        errors[CaptureError.CAPTURE_NOT_SUPPORTED]    = 'The requested capture operation is not supported.';

        var contents  = addGridRow("a", boldLabel("ERROR:"));
            contents += addGridRow("b", errors[error.code]);

        $("#captureProperties").css("display", "block");
        $("#captureProperties").html(contents);

        updateCaptureStatus("ERROR");
    }

    clearDisplayStatus();
    switch(captureType) {
        case "audio":
            navigator.device.capture.captureAudio(captureSuccess, captureError);
            break;
        case "image":
            navigator.device.capture.captureImage(captureSuccess, captureError);
            break;
        case "video":
            navigator.device.capture.captureVideo(captureSuccess, captureError);
            break;
    }
}

clearDisplayStatus();

$$(document).on('click', '#captureAudioButton', function (e)
{
        e.preventDefault();
        goCapture('audio');
        return false;
});
$$(document).on('click', '#captureImageButton', function (e)
{
        e.preventDefault();
        goCapture('image');
        return false;
});
$$(document).on('click', '#captureVideoButton', function (e)
{
        e.preventDefault();
        goCapture('video');
        return false;
});

//*********************************************************
// initialize the environment
//*********************************************************
//$$("#captureMainPage").bind("pagebeforeshow", function() { getCaptureReady(); } );
