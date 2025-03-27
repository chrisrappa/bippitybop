const gtmTrackButtonClick = (event, eventName) => {

  window?.dataLayer?.push({
    event: eventName,
    element: event.currentTarget,
  })

};

export default gtmTrackButtonClick;