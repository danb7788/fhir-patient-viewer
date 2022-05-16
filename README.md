# FHIR Patient Viewer

FHIR Patient Viewer is a minimalistic, interactive, unopinionated, unfiltered rendering 
tool for displaying raw FHIR patient data and their relationships in an intuitive,
visually-pleasant way.

Content expressiveness and interactivity help professionals in the healthcare 
industry understand the FHIR specification better:

https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6784845/

## Demo

https://danb7788.github.io/fhir-patient-viewer-demo/

## Quickstart
Add the following to your HTML:
```html
<!-- Include stylesheet -->
<link href="https://combinatronics.com/danb7788/fhir-patient-viewer/master/dist/css/fhir-patient-viewer.css" rel="stylesheet" />

<!-- Include the div that will render the visualizer -->
<div id="fhir-visualizer"></div>

<!-- Add your FHIR Patient endpoint URL and the patient ID to the window object -->
<script>
    window.intersystemsUrl = 'http://52773-1-a9762ab6.labs.learning.intersystems.com/csp/healthshare/fhirserver/fhir/r4/';
    window.intersystemsPatientId = 1;
</script>

<!-- Include the bundled dependencies and the visualizer library (in that order) -->
<script src="https://combinatronics.com/danb7788/fhir-patient-viewer/master/dist/js/fhir-patient-viewer-dependencies.js"></script>
<script src="https://combinatronics.com/danb7788/fhir-patient-viewer/master/dist/js/fhir-patient-viewer.js"></script>
```

## Built if yourself
To build your own CSS and JS files from source, clone the repo and install all the dependencies:
```
npm install
```
Then test it in your localhost:
```
npm run serve
```
Modify it as you wish, and then build the distribution files:
```
npm run build
```
## Launch your own InterSystems FHIR demo server

https://gettingstartedhealth.intersystems.com/standards-quickstarts/fhir-quickstart/

## Run the InterSystems IRIS container in your own machine

https://hub.docker.com/_/intersystems-iris-for-health/plans/80ae1325-d535-484e-8307-b643c2865dd8?tab=instructions

