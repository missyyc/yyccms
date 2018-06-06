
export default function createBmapScript(){
    let mapScript = document.getElementById('mapScript');
    if(!mapScript){
        // mapScript.parentNode.removeChild(mapScript)
        mapScript = document.createElement('script');
        mapScript.type = 'text/javascript';
        mapScript.id = 'mapScript';
        let head = document.querySelector('head');
        mapScript.src='http://api.map.baidu.com/getscript?v=2.0&ak=asBi7WBV6z9YpxhVCRyI3FDYnebMQXzp&services=&t='+new Date().getTime();
        head.appendChild(mapScript);
    }
    return mapScript;
}