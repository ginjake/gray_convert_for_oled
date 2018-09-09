
var file = document.getElementById('file');
var convertCanvas = document.getElementById('convertImgCanvas');
var convertCanvasAfter1 = document.getElementById('convertImgCanvasAfter1');
var convertCanvasAfter2 = document.getElementById('convertImgCanvasAfter2');
var uploadImgSrc;

// Canvasの準備

var ctx_cnv;
var ctx_cnv_after1;
var ctx_cnv_after2;
function loadLocalImage(e) {
    // ファイル情報を取得
    var fileData = e.target.files[0];

    // 画像ファイル以外は処理を止める
    if(!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
    }

    // FileReaderオブジェクトを使ってファイル読み込み
    var reader = new FileReader();
    // ファイル読み込みに成功したときの処理
    reader.onload = function() {
        // Canvas上に表示する
        uploadImgSrc = reader.result;
        canvasDraw();
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
}

// ファイルが指定された時にloadLocalImage()を実行
file.addEventListener('change', loadLocalImage, false);

function cnvImg(){
    // canvas内の要素をクリアする
    var cellHeight = convertCanvas.height
    var cellWidth = convertCanvas.width

    var image_data = ctx_cnv.getImageData(0, 0, cellWidth, cellHeight);
    var image_data2 = ctx_cnv.getImageData(0, 0, cellWidth, cellHeight);
    var data = image_data.data;
    var data2 = image_data2.data;
    var mosaic_switch = true;
    for (var row = 0; row < cellHeight; row++) {
        mosaic_switch = (row % 2 == 0);
        for (var col = 0; col < cellWidth; col++) {
            var base_index = (row * cellWidth + col) * 4;
            mosaic_switch = !mosaic_switch;

            if(data[base_index] == 255 && data[base_index + 1] == 255  && data[base_index + 2] == 255)
                continue;
            if(data[base_index] == 0 && data[base_index + 1] == 0  && data[base_index + 2] == 0)
                continue;
            if(data[base_index] == 1 && data[base_index + 1] == 1  && data[base_index + 2] == 1)
                continue;

            console.log(data[base_index]+":"+data[base_index+1]+":"+data[base_index+2])
            if(mosaic_switch) {
                data[base_index] = 255;
                data[base_index + 1] = 255;
                data[base_index + 2] = 255;
            } else {
                data[base_index] = 0;
                data[base_index + 1] = 0;
                data[base_index + 2] = 0;
            }

        }
    }


    mosaic_switch = false;
    for (var row = 0; row < cellHeight; row++) {
        mosaic_switch = (row % 2 == 1);
        for (var col = 0; col < cellWidth; col++) {
            var base_index = (row * cellWidth + col) * 4;
            mosaic_switch = !mosaic_switch;

            if(data2[base_index] == 255 && data2[base_index + 1] == 255  && data2[base_index + 2] == 255)
                continue;
            if(data2[base_index] == 0 && data2[base_index + 1] == 0  && data2[base_index + 2] == 0)
                continue;
            if(data2[base_index] == 1 && data2[base_index + 1] == 1  && data2[base_index + 2] == 1)
                continue;

            if(mosaic_switch) {
                data2[base_index] = 255;
                data2[base_index + 1] = 255;
                data2[base_index + 2] = 255;
            } else {
                data2[base_index] = 0;
                data2[base_index + 1] = 0;
                data2[base_index + 2] = 0;
            }

        }
    }
    ctx_cnv_after1.clearRect(0, 0, cellWidth, cellHeight);
    ctx_cnv_after1.putImageData(image_data, 0, 0);
    ctx_cnv_after2.clearRect(0, 0, cellWidth, cellHeight);
    ctx_cnv_after2.putImageData(image_data2, 0, 0);
}

function chgImg()
{
  var png = canvas.toDataURL();
  document.getElementById("newImg").src = png;
}

// Canvas上に画像を表示する
function canvasDraw() {
    // Canvas上に画像を表示
    var img = new Image();
    img.src = uploadImgSrc;

    img.onload = function() {


        convertCanvas.width = img.width
        convertCanvas.height = img.height
        convertCanvasAfter1.width = img.width
        convertCanvasAfter1.height = img.height
        convertCanvasAfter2.width = img.width
        convertCanvasAfter2.height = img.height
        ctx_cnv = convertCanvas.getContext('2d')
        ctx_cnv_after1 = convertCanvasAfter1.getContext('2d')
        ctx_cnv_after2 = convertCanvasAfter2.getContext('2d')
        ctx_cnv.clearRect(0, 0, convertCanvas.width, convertCanvas.height);
        ctx_cnv.drawImage(img, 0, 0, convertCanvas.width, convertCanvas.height);

    }
}

