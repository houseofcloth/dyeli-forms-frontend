---
layout: layouts/form-pages.njk
tags: forms
title: Online Order Feedback
description:
  We would love to know about your experience purchasing through our online store.
sidebarText:
  - Please enter your name, and feedback
  - Enter email and/or phone if you wish <em>House of Cloth</em> to follow up on this feedback.
emailIsOptional: true
hideDetailsHeader: true
formName: orderFdbk
rangeFields:
  - label: Checkout Experience
    name: chkexp
  - label: Website Usability
    name: eofu
  - label: Image Quality
    name: imgqlty
  - label: Pricing
    name: prices
  - label: Payment Options
    name: payopts
  - label: Delivery Options
    name: delopt
  - label: Delivery Time
    name: deltime
  - label: Notifications
    name: notifs
formEndpoint: /onlineorder
formTitle: Feedback Form
btnText: Send Feedback
