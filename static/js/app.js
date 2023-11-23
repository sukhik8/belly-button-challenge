function setDropDown(names) {
    // Populat dropdown with json names data
    let idNum = ''
    let dMenu = d3.select("#selDataset")
    for (i=0;i<names.length;i++) {
        idNum = names[i]
        newEle = dMenu.append('option')
        newEle.text(idNum)
        newEle.property('value',i)
    };

};

function setPlots(dataFull,id=0) {
    let samples = dataFull['samples']
    let info = dataFull['metadata']
    // Initialize Bar Chart Use 0
    let barY = []
    for (i=0;i<10;i++) {
        barY.push(`OTU ${samples[id].otu_ids[i]}`)
    };
    data = [{
        x: samples[id].sample_values.slice(0,10).reverse(),
        y: barY.reverse(),
        text: samples[id].otu_labels.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h'}];
    layout = {
        title: 'Top Samples (Up to 10)',
        height: 750,
        width: 500,
    };
    Plotly.newPlot("bar", data,layout);

    // Initialize bubble chart Use 0
    data = [{
        x: samples[id].otu_ids,
        y: samples[id].sample_values,
        marker: { size: samples[id].sample_values,
        color: samples[id].otu_ids,
        colorscale: 'Earth'},
        text: samples[id].otu_labels,
        mode: 'markers'}];
    layout = {xaxis: {
        title: 'OTU ID'},
        height: 500,
        width: 1250,
        };
    Plotly.newPlot("bubble", data,layout);

    };

function setInfo(info,id=0) {
    // Initialize metadata
    tb = d3.select('.panel-body').append('p')
    lines = tb.html(`id: ${info[id]['id']}<br>
    ethnicity: ${info[id]['ethnicity']}<br>
    gender: ${info[id]['gender']}<br>
    age: ${info[id]['age']}<br>
    location: ${info[id]['location']}<br>
    bbtype: ${info[id]['bbtype']}<br>
    wfreq: ${info[id]['wfreq']}`)
    lines.style('font-size','90%')

};

function resetPlots(samples,id=0) {
    // Reset bar chart
    points = 10
    if (samples[id].sample_values.length < 10) {
        points = samples[id].sample_values.length
    };

    let barY = []
    for (i=0;i<points;i++) {
        barY.push(`OTU ${samples[id].otu_ids[i]}`)

    };
    Plotly.restyle("bar", 'x',[samples[id].sample_values.slice(0,points).reverse()]);
    Plotly.restyle("bar", 'y',[barY.reverse()]);
    Plotly.restyle("bar", 'text',[samples[id].otu_labels.slice(0,points).reverse()]);

    // Reset bubble chart
    Plotly.restyle("bubble", 'x', [samples[id].otu_ids]);
    Plotly.restyle("bubble", 'y', [samples[id].sample_values]);
    Plotly.restyle("bubble", 'marker',[{ size: samples[id].sample_values,color: samples[id].otu_ids,colorscale: 'Earth'}]);
    Plotly.restyle("bubble", 'text', [samples[id].otu_labels]);



};

function resetInfo(info,id=0) {
    // Reset Info
    tb = d3.select('.panel-body')
    lines = tb.html(`id: ${info[id]['id']}<br>
    ethnicity: ${info[id]['ethnicity']}<br>
    gender: ${info[id]['gender']}<br>
    age: ${info[id]['age']}<br>
    location: ${info[id]['location']}<br>
    bbtype: ${info[id]['bbtype']}<br>
    wfreq: ${info[id]['wfreq']}`)
    lines.style('font-size','90%')

};

function optionChanged() {
    const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
    samples = d3.json(url).then(function(data) {
        let samples = data['samples']
        let info = data['metadata']
        let dropdownMenu = d3.select("#selDataset");
        let id = dropdownMenu.property("value");
        resetPlots(samples,parseInt(id))
        resetInfo(info,id)
    });
};

    // Start of initializing
function init() {
    const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
    samples = d3.json(url).then(function(data) {
        let samples = data['samples']
        let info = data['metadata']
        let names = data['names']
        setPlots(data,0)
        setInfo(info,0)
        setDropDown(names)
    });
};

init()
