clinical-ui-forms
========================

#### Please note:

This repository is based on a clone of awatson1978/clinical-ui-forms.git. I have updated it to be compatible with Meteor v1.0+ and have completed its CRUD functionality. It can now update documents. I also did some removal of cruft and renamed some variables for readability and internal consistency. (from my perspective ;-) Following the original author's lead the records are for "customers" and not "patients" or "users". For my own purposes this will be used in an app designed to track research subjects so the naming conventions may change in the future.

Installation from this repository:

````sh
git clone https://github.com/dpneumo/clinical-ui-forms-updated.git
cd clinical-ui-forms-updated
meteor
''''

The following is the ReadMe from awatson1978/clinical-ui-forms.git
==================================================================

Meteor app demonstrating form elements, controls, and other features.
Demo available at:  [http://clinical-ui-forms.meteor.com](http://clinical-ui-forms.meteor.com)


============================
#### Notes

This applet demonstrates how to use <input> elements with a pure-Meteor CRUD pattern.  It doesn't use form tags, and it doesn't auto-build a form using a JSON object.  It's intent is for the form builder who wants a high degree of granularity and control in builder his or her user interfaces.


============================
### Installation

````sh
git clone https://github.com/awatson1978/clinical-ui-forms.git
cd clinical-ui-forms
sudo mrt
````

============================
### Pull Requests Accepted

Will happily accept pull requests if people want to add form elements to this applet.  Looking to create a full featured form library for Clinical applications.  Looking for a minimalistic, responsive, and mobile friendly design.  So, be aware that things like radiobuttons, datepickers, dropdowns, and other UI elements are subject to change and refinement.


------------------------
### Licensing

MIT License. Use as you wish, including for commercial purposes.

