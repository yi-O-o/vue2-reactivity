import observe from "./observe";
function observeArr(data) { 
    data.forEach(item => {
        observe(item)
    });
 }

 export default observeArr