window.onload = init;
let getData;

function init() {
  
  // Get data from API
  getData = new XMLHttpRequest();
  getData.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let druggedData = JSON.parse(getData.responseText);
      renderScatterPlot(druggedData);
    }
  }
  let dataURL = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
  getData.open('get', dataURL, true);
  getData.send();
}

function renderScatterPlot(data) {
  const w = 800;
  const h = 300;
  const padding = 45;

  const xScale = d3.scaleLinear()
                   .domain([d3.min(data, (d) => d.Year - 1), d3.max(data, (d) => d.Year)])
                   .range([padding, w - padding]);

  const yScale = d3.scaleLinear()
                   .domain([d3.min(data, (d) => d.Seconds), d3.max(data, (d) => d.Seconds)])
                   .range([padding, h-padding]);
  
  const svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

  data.forEach((d) => console.log(yScale(h - d.Seconds)));

  svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", (d) => xScale(d.Year))
     .attr("cy", (d) => yScale(d.Seconds))
     .attr("r", 5);
     
  svg.selectAll("text")
     .data(data)
     .enter()
     .append("text")
     .attr('x', (d) => xScale(d.Year))
     .attr('y', (d) => yScale(d.Seconds))
     .text((d) => `${d.Year}, ${d.Seconds}`);

  const xAxis = d3.axisBottom(xScale);
  svg.append("g")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .attr("id", "x-axis")
      .call(xAxis);

  const yAxis = d3.axisLeft(yScale);
  svg.append("g")
      .attr("transform", "translate(" + (padding) + ", 0)")
      .attr("id", "y-axis")
      .call(yAxis);
}

