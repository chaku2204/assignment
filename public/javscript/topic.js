let url = `http://localhost:3000/api/data`;
let topic = new Set();
const filtertopic= async()=>{
    try{
        const response = await fetch(url);
        const allData = await response.json();
        for (let i in allData){
            topic.add(allData[i].topic);
        }
        
       }catch(error){
        console.error(error);
      }

      const sortedtopic = Array.from(topic).sort((a,b)=>a.localeCompare(b))
      console.log(sortedtopic);

      let Topics = document.getElementById("status-filter");
      sortedtopic.forEach(i=> {
            var option = document.createElement("option");
            option.value = i;
            option.text = i;
            Topics.appendChild(option);
      })
}
filtertopic();


