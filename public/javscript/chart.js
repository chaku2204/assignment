
// console.log(end_year_min.target.value);
chart();
const end_year_min = document.getElementById("category-filter");
const topics= document.getElementById("status-filter");

end_year_min.addEventListener("change",async (event)=>{
    console.log(topics.value);
    console.log(end_year_min.value);
    let url;
    if(end_year_min.value === "all_year"){
      url =  `http://localhost:3000/api/data?topic=${topics.value}`;
    }else{
        url =  `http://localhost:3000/api/data?end_year_min=${event.target.value}&&topic=${topics.value}`;
    }
    console.log(url);
    try{
        let d = await takedat(url);
        let chec = document.getElementById('myChart');
        let temp = document.createElement("canvas");
        temp.id = "myChart";
        
        console.log(chec);
    //     let myChart = new Chart(ctx, {
    //         type: 'line', // Specify the type of chart (e.g., bar, line, pie)
    //         data: {
    //             labels: d._keys, // Provide labels for the chart data
    //             datasets: [
    //             {
    //                 label: 'Data', // Label for the dataset
    //                 data: d._label, // The actual data values
    //                 // backgroundColor: ['red', 'green', 'blue'], // Colors for the data bars
    //             },
    //             ],
    //         },
    //         options: {
    //             // Configure additional options for the chart (e.g., title, legend)
    //         },

    //   });
    //   document.getElementsByClassName("dashboard-content")[0].appendChild(temp);

    //  myChart.render();

    }
    catch(error){
        console.error(error);
    }
})


async function takedat(url){
    try {
        const response = await fetch(url);
        const allData = await response.json();
        let myMap = new Map();
        for (let i in allData){
            if(myMap.has(allData[i].end_year)){
                let value = myMap.get(allData[i].end_year);
                value = value+1;
                myMap.set(allData[i].end_year,value);
            }
            else{
                    myMap.set(allData[i].end_year,1);
            }
        }
        if(myMap.has("")){
            let emptyvalue = myMap.get("");
            myMap.delete("");
            myMap.set(emptyvalue);
        }
        myMap = new Map([...myMap.entries()].sort());
        let label = [];
        let keys = [];
       
        myMap.forEach((value, key) => {
            // console.log(key,value);
            label.push(value);
            keys.push(key);
        });
     
  return {_label:label,_keys:keys};
    }catch(error){
       console.error(error);
    }
}

async function chart(){
    try{
        let url = `http://localhost:3000/api/data`;
        let d = await takedat(url);
        let mychart = document.getElementById('myChart')
        let ctx = mychart.getContext('2d');
            
        let myChart = new Chart(ctx, {
                type: 'line', // Specify the type of chart (e.g., bar, line, pie)
                data: {
                    labels: d._keys, // Provide labels for the chart data
                    datasets: [
                    {
                        label: 'Data', // Label for the dataset
                        data: d._label, // The actual data values
                        // backgroundColor: ['red', 'green', 'blue'], // Colors for the data bars
                    },
                    ],
                },
                options: {
                    // Configure additional options for the chart (e.g., title, legend)
                },
        });
        console.log(myChart.data.datasets[0].data);
        console.log(myChart.data.labels);
         myChart.render();
          

    }catch(error){
        console.error(error);
    }
}






  
      
     

      
    
    

      


