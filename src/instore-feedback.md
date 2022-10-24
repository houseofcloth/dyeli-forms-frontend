---
layout: layouts/form-pages.njk
tags: forms
title: Instore Feedback
description:
  If you have visited our bricks and mortar store, we would love to know about your experience while you were there, whether you purchased <em>(or not.)</em>
sidebarText:
  - Please enter your name, and feedback
  - Enter email and/or phone if you wish <em>House of Cloth</em> to follow up on this feedback.
formName: instoreFdbk
formTitle: Feedback Form
btnText: Send Feedback
rangeFields:
  - label: Customer Service
    name: custsrv
  - label: Atmosphere
    name: atmos
  - label: Shop Layout
    name: shopdsgn
  - label: Product Knowledge
    name: prodknow
  - label: Product Range
    name: prodrng
  - label: Prices
    name: prices
formEndpoint: /instore
hideDetailsHeader: true
emailIsOptional: true
