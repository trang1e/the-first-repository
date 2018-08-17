const http=require('http');
const fs=require('fs');
const path=require('path');

for(let i=1;i<50;i++){
  http.get('http://pp.163.com/pp/searchpic/?q=%C3%C0%C5%AE&s=0&page='+i,function(res){
    let content="";
    res.on('data',function(txt){
      content+=txt;
    });
    res.on('end',function() {
        let reg = /src="(.*?\.jpg)"/img;

      let filename = null;
      while (filename = reg.exec(content)) {
        getImage(filename[1]);
      }
    });
  });


  function getImage(url){
    let obj=path.parse(url);
    let name=obj.base;
    let filestream=fs.createWriteStream('./image/'+name);
    http.get(url,function(res){
      res.pipe(filestream);
    })

  }
}


