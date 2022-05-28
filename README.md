# FHIR Patient Viewer

![Alt Text](https://media.giphy.com/media/UXO1VWyK7ZeD72NwVg/giphy.gif)

FHIR Patient Viewer is a minimalistic, interactive, unopinionated, unfiltered rendering 
tool for displaying raw FHIR patient data fetched from an InterSystems IRIS for Health FHIR endpoint
in an intuitive, visually-pleasant way.

Content expressiveness and interactivity help professionals in the healthcare 
industry understand the FHIR specification better:

https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6784845/

## Demo

Live demo: https://danb7788.github.io/fhir-patient-viewer-demo

Video demo: https://youtu.be/TgeLokoTH5c

## IRIS sandbox FHIR server setup and seeding

Follow the following instructions to create a sandbox IRIS container and set up
a FHIR endpoint that returns sample patient data:

https://gettingstartedhealth.intersystems.com/standards-quickstarts/fhir-quickstart/

## Quickstart
In your frontend, add the following to your HTML:
```html
<!-- Include stylesheets -->
<link href="https://combinatronics.com/danb7788/fhir-patient-viewer/master/dist/css/fhir-patient-viewer-dependencies.css" rel="stylesheet" />
<link href="https://combinatronics.com/danb7788/fhir-patient-viewer/master/dist/css/fhir-patient-viewer.css" rel="stylesheet" />

<!-- Include the div that will render the visualizer -->
<div id="fhir-visualizer"></div>

<!-- Add your IRIS FHIR endpoint URL and the patient ID to the window object -->
<script>
    window.intersystemsUrl = 'http://52773-1-a9762ab6.labs.learning.intersystems.com/csp/healthshare/fhirserver/fhir/r4/';
    window.intersystemsPatientId = 1;
</script>

<!-- Include the libraries -->
<script src="https://combinatronics.com/danb7788/fhir-patient-viewer/master/dist/js/fhir-patient-viewer-dependencies.js"></script>
<script src="https://combinatronics.com/danb7788/fhir-patient-viewer/master/dist/js/fhir-patient-viewer.js"></script>
```

## Build your own dist files
To build your own CSS and JS files from source, clone the repo and install all the dependencies:
```
npm install
```
Then test it in your localhost:
```
npm run serve
```
Modify the source code as you wish, and then generate your own distribution files by running:
```
npm run build
```

## Use cases

FHIR Patient Viewer can be used as:

* A stand alone front-end EHR viewer connected to an IRIS FHIR server.

* A visualization tool within an EMR/EHR system for data-driven end users.

* A visualization tool within an analytics application that interacts with an IRIS FHIR server.

* A debugging tool when developing applications that interact with an IRIS FHIR server.

* An educational tool for understanding FHIR resources and their relationships.

## License

MIT License (MIT)
