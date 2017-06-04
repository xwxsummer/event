/**
 * Created by 123 on 2017/4/18.
 */

import { Output, EventEmitter, Component } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {imgCompress} from "./imgCompress";
import {deliverGoodsService} from "../deliverGoods.service";
declare var mui: any;
declare var $: any;

export class imgData{
    constructor(
        public data:string,
        public type:string
    ){}
}

@Component({
    selector: 'app-Remarks',
    templateUrl: './Remarks.component.html',
    styleUrls: ['./Remarks.component.css']
 })

export class Remarks {

    // @Output() updateImg:EventEmitter<number> = new EventEmitter();
    // imgInput:any;

    public imgList: any[] = [];
    public remarkText:string ='';

    @Output()
    imgOutput:EventEmitter<imgData[]> = new EventEmitter();
    @Output()
    textOutput:EventEmitter<string> = new EventEmitter();

    constructor(
        public router: Router,
        public service: deliverGoodsService
    ) {

    }

    RemarksToggle(){
      $('#RemarksToggle').click()
    }
    removeImage(index){
      //console.log(index);
      this.imgList.splice(index,1);
      //this.imgOutput.emit(this.imgList);
      //console.log(this.imgList)
    }
    setRemarkText(text){
        this.remarkText = text;
        this.textOutput.emit(this.remarkText);
        //console.log(text);
    }

    ngOnInit() {
        //console.log('备注模块');

        this.imgOutput.emit(this.imgList);
        let filechooser = document.getElementById("file");
        $("#upload")
            .on("touchstart", function() {
                $(this).addClass("touch")
            })
            .on("touchend", function() {
                $(this).removeClass("touch")
            });
        let imgList = this.imgList;
        let service = this.service;
        //var imgOutput = this.imgOutput;
        filechooser.onchange = function() {
            if (!(<HTMLInputElement>this).files.length) return;
            var files = Array.from((<HTMLInputElement>this).files);
            if (imgList.length >= 6) {
                mui.alert("最多同时只可上传6张图片");
                return;
            }
            files.forEach(function(file, i) {
                if (!/\/(?:jpeg|png|gif)/i.test(file.type)) return;
                imgCompress(file,0.3).then(function(result) {
                    // var li = document.createElement("li");
                    // $(li).css("background-image", "url(" + result + ")");
                    // $(".img-list").append($(li));
                    // console.log(imgList);
                    imgList.push(new imgData(<string>result,file.type));
                    service.upBase64Image(<string>result).then(console.log)
                    // imgList.push({data:result,type:file.type});
                    //imgOutput.emit(imgList);

                });
                // $(".img-list").append($(li));
                // var reader = new FileReader();
                // var li = document.createElement("li");
                //获取图片大小并显示
                //  var size = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024)) / 10 + "MB" : ~~(file.size / 1024) + "KB";
                //  li.innerHTML = '<div class="progress"><span></span></div><div class="size">' + size + '</div>';
                //    $(".img-list").append($(li));
                //    reader.onload = function() {
                //      var result = this.result;
                //      var img = new Image();
                //      img.src = result;
                //      $(li).css("background-image", "url(" + result + ")");
                //      //如果图片大小小于100kb，则直接上传
                //      if (result.length <= maxsize) {
                //        img = null;
                //        // upload(result, file.type, $(li));
                //        return;
                //      }
                // //      图片加载完毕之后进行压缩，然后上传
                //      if (img.complete) {
                //        callback();
                //      } else {
                //        img.onload = callback;
                //      }
                //      function callback() {
                //          console.log('压缩图片')
                //        var data = imgCompress(img);
                //        // upload(data, file.type, $(li));
                //        img = null;
                //      }
                //  };
                //    reader.readAsDataURL(file);
            })
        };
        //    使用canvas对大图片进行压缩
        // function compress(img) {
        //  var initSize = img.src.length;
        //  var width = img.width;
        //  var height = img.height;
        //  //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        //  var ratio;
        //  if ((ratio = width * height / 4000000) > 1) {
        //    ratio = Math.sqrt(ratio);
        //    width /= ratio;
        //    height /= ratio;
        //  } else {
        //    ratio = 1;
        //  }
        //  canvas.width = width;
        //  canvas.height = height;
        // //        铺底色
        //  ctx.fillStyle = "#fff";
        //  ctx.fillRect(0, 0, canvas.width, canvas.height);
        //  //如果图片像素大于100万则使用瓦片绘制
        //  var count;
        //  if ((count = width * height / 1000000) > 1) {
        //    count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        // //            计算每块瓦片的宽和高
        //    var nw = ~~(width / count);
        //    var nh = ~~(height / count);
        //    tCanvas.width = nw;
        //    tCanvas.height = nh;
        //    for (var i = 0; i < count; i++) {
        //      for (var j = 0; j < count; j++) {
        //        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
        //        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
        //      }
        //    }
        //  } else {
        //    ctx.drawImage(img, 0, 0, width, height);
        //  }
        //  //进行最小压缩
        //  var ndata = canvas.toDataURL('image/jpeg', 0.1);
        //  console.log('压缩前：' + initSize);
        //  console.log('压缩后：' + ndata.length);
        //  console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
        //  tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        //  return ndata;
        // }
        //    图片上传，将base64的图片转成二进制对象，塞进formdata上传
        // function upload(basestr, type, $li) {
        //   //显示图片
        //   $(".pic-list").append('<img width="100" src="' + basestr + '" /></a>');
        //   return;
        //上传地址错误
        // var text = window.atob(basestr.split(",")[1]);
        // var buffer = new Uint8Array(text.length);
        // var pecent = 0, loop = null;
        // for (var i = 0; i < text.length; i++) {
        //   buffer[i] = text.charCodeAt(i);
        // }
        // var blob = getBlob([buffer], type);
        // var xhr = new XMLHttpRequest();
        // var formdata = getFormData();
        // formdata.append('imagefile', blob);
        // //上传地址
        // xhr.open('post', '/cupload');
        // xhr.onreadystatechange = function() {
        //   if (xhr.readyState == 4 && xhr.status == 200) {
        //     var jsonData = JSON.parse(xhr.responseText);
        //     var imagedata = jsonData[0] || {};
        //     var text = imagedata.path ? '上传成功' : '上传失败';
        //     console.log(text + '：' + imagedata.path);
        //     clearInterval(loop);
        //     //当收到该消息时上传完毕
        //     $li.find(".progress span").animate({'width': "100%"}, pecent < 95 ? 200 : 0, function() {
        //       $(this).html(text);
        //     });
        //     if (!imagedata.path) return;
        //     $(".pic-list").append('<a href="' + imagedata.path + '">' + imagedata.name + '（' + imagedata.size + '）<img src="' + imagedata.path + '" /></a>');
        //   }
        // };
        // //数据发送进度，前50%展示该进度
        // xhr.upload.addEventListener('progress', function(e) {
        //   if (loop) return;
        //   pecent = ~~(100 * e.loaded / e.total) / 2;
        //   $li.find(".progress span").css('width', pecent + "%");
        //   if (pecent == 50) {
        //     mockProgress();
        //   }
        // }, false);
        // //数据后50%用模拟进度
        // function mockProgress() {
        //   if (loop) return;
        //   loop = setInterval(function() {
        //     pecent++;
        //     $li.find(".progress span").css('width', pecent + "%");
        //     if (pecent == 99) {
        //       clearInterval(loop);
        //     }
        //   }, 100)
        // }
        // xhr.send(formdata);
        // }
        /**
        * 获取blob对象的兼容性写法
        * @param buffer
        * @param format
        * @returns {*}
        */
        // function getBlob(buffer, format?) {
        //    return new Blob(buffer, {type: format});
        // }
        /**
        * 获取formdata
        */
        // function getFormData() {
        //  var isNeedShim = ~navigator.userAgent.indexOf('Android')
        //      && ~navigator.vendor.indexOf('Google')
        //      && !~navigator.userAgent.indexOf('Chrome')
        //      && parseFloat(navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop()) <= 534;
        //  return isNeedShim ? new FormDataShim() : new FormData()
        // }
        /**
        * formdata 补丁, 给不支持formdata上传blob的android机打补丁
        * @constructor
        */
        // function FormDataShim() {
        //  console.warn('using formdata shim');
        //  var o = this,
        //      parts = [],
        //      boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
        //      oldSend = XMLHttpRequest.prototype.send;
        //  this.append = function(name, value, filename) {
        //    parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
        //    if (value instanceof Blob) {
        //      parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
        //      parts.push(value);
        //    }
        //    else {
        //      parts.push('\r\n\r\n' + value);
        //    }
        //    parts.push('\r\n');
        //  };
        //  // Override XHR send()
        //  XMLHttpRequest.prototype.send = function(val) {
        //    var fr,
        //        data,
        //        oXHR = this;
        //    if (val === o) {
        //      // Append the final boundary string
        //      parts.push('--' + boundary + '--\r\n');
        //      // Create the blob
        //      data = getBlob(parts);
        //      // Set up and read the blob into an array to be sent
        //      fr = new FileReader();
        //      fr.onload = function() {
        //        oldSend.call(oXHR, fr.result);
        //      };
        //      fr.onerror = function(err) {
        //        throw err;
        //      };
        //      fr.readAsArrayBuffer(data);
        //      // Set the multipart content type and boudary
        //      this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
        //      XMLHttpRequest.prototype.send = oldSend;
        //    }
        //    else {
        //      oldSend.call(this, val);
        //    }
        //  };
        // }
    }

    // readImage(event?:Event) {
    //    console.log('读取图片')
    //    let file = (<HTMLInputElement>event.target).files[0];
    //    if (!/image\/\w+/.test(file.type)) {
    //        console.error("请确保文件为图像类型");
    //        return false;
    //    }
    //    var reader = new FileReader();
    //    reader.readAsDataURL(file);
    //    reader.onload = e => {
    //        this.updateImg.emit ( (<any>e.target).result );
    //        console.log((<any>e.target).result)
    //    }
    // }

}
