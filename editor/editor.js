window.onload = function(){
	var iframe = $("iframe");
	var doc = iframe.contentDocument || iframe.contentWindow.document;//contentWindow.document针对ie
	doc.designMode = "on";
    
    bindButton(doc);
    bindSelect(doc);
    var ForeColor = $("ForeColor");
    var BackColor = $("BackColor");
    colorClick(ForeColor,doc);
    colorClick(BackColor,doc);
};

asdf

//get ID
function $(id){
	return document.getElementById(id);
}

//bind li when click
var bindButton = function(doc){
    var ul = $("btn-list");
    var buttons = ul.getElementsByTagName("li");
    var result = [];
    for(var i = 0;i < buttons.length;i++){
        result[i] = function(num){
            eventUtil.addHandler(buttons[num],"click",function(){
                var temp = buttons[num];
                var command = temp.getAttribute("id");
                if(command == "insertimage" || command == "createlink"){
                        var value = prompt("请输入超链接: ","http://");
                        doc.execCommand(command,false,value);
                }
                else{
                        doc.execCommand(command);
                }
            });
        }(i);
    }
};

//bind select when click
var bindSelect = function(doc){
    var ul = $("btn-list");
    var selects = ul.getElementsByTagName("select");
    var result = [];
    for(var i = 0;i < selects.length;i++){
        result[i] = function(num){
            var select = selects[num];
            eventUtil.addHandler(select,"click",function(){
                select.onchange = new function(){
                    var command = select.getAttribute("title");
                    var value = select.options[select.selectedIndex].value; // why value should be here.
                    doc.execCommand(command,false,value);
                };
            });
        }(i);
    }
};

//bulid a color table
var colorBuilder = function(){
    var color = ["FF","CC","99","66","33","00"];
    var builder = [];

    var colorCell = function(builder,red,green,blue){  //bulid a color cell
        builder.push('<td bgColor="');
        builder.push('#' + red + green + blue);
        builder.push('" unselectable="on"></td>');
        // builder.push("<td bgColor='"#" + red + green + blue'></td>");
    };
    var colorLine = function(builder,red,green){
        builder.push("<tr>");
        for(var i = 0;i < 6;i++){
            colorCell(builder,red,green,color[i]);
        }
        builder.push("</tr>");
    };
    var colorTable = function(builder,red){    //build a table
        builder.push("<table class='cell'>");
        for(var i = 0;i < 6;i++){
            colorLine(builder,red,color[i]);
        }
        builder.push("</table>");
    };
    //build the whole table
    builder.push("<table id='colorselect'><tr>");
    for(var i = 0;i < 3;i++){
        builder.push("<td>");
        colorTable(builder,color[i]);
        builder.push("</td>");
    }
    builder.push("</tr><tr>");
    for(var i = 3;i < 6;i++){
        builder.push("<td>");
        colorTable(builder,color[i]);
        builder.push("</td>");
    }
    builder.push("</tr></table>");
    //the select color table
    builder.push("<table class='selectcolor'><tr>");
    builder.push("<td class='colorview'></td>");
    builder.push("<td class='colorcode'></td>");
    builder.push("</tr></table>");
    return builder.join("");
};

//add event handler
var eventUtil = {
    addHandler: function(ele,type,handler){
        if(ele.addEventListener){
            ele.addEventListener(type,handler,false);
        }else if(ele.attachEvent){
            ele.attachEvent("on" + type,handler);
        }else{
            ele["on" + type] = handler;
        }
    }
};

//get target
var getTarget = function(event){
    event = event || window.event;
    var obj = event.srcElement?event.srcElement:event.target;
    return obj;
};

//through the mouse to show the color
var getColor = function(obj,parent,doc){
    eventUtil.addHandler(obj,"mouseover",function(e){
        var target = getTarget(e);     //getElementsByClassName return nodesList!
        var colorview = document.getElementsByClassName("colorview")[0];
        var colorcode = document.getElementsByClassName("colorcode")[0];
        
        if(target.nodeName.toLowerCase() == "td"){   //nodeName return a uppercase letter
            colorview.style.backgroundColor = target.bgColor;
            colorcode.innerHTML = target.bgColor;
        }
    });
    eventUtil.addHandler(obj,"click",function(e){
        var target = getTarget(e);
        if(target.nodeName.toLowerCase() == "td"){   //nodeName return a uppercase letter
            $("colorbox").style.display = "none";
            var value = target.bgColor;
            if(parent == "ForeColor"){
                doc.execCommand("ForeColor",false,value);
            }
            if(parent == "BackColor"){
                doc.execCommand("BackColor",false,value);
            }
        }
    });
};

//click to show color table
var colorClick = function(obj,doc){
    eventUtil.addHandler(obj,"click",function(e){
        var colorbox = $("colorbox");
        colorbox.style.display = "inline";
        var target = getTarget(e);
        if(target.id == "ForeColor"){
            colorbox.style.left = 300 + "px";
        }
        if(target.id == "BackColor"){
            colorbox.style.left = 330 + "px";
        }
        colorbox.innerHTML = colorBuilder();
        var colorselect = $("colorselect");
        getColor(colorselect,target.id,doc);
    });

}
