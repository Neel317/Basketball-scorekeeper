
export class Kratos{
  constructor(options) {
    this.data = {
      currentPage: window.location.href,
      userData: {
        guestId : localStorage.getItem('guestId'),
        browser : window.navigator.userAgentData.brands[2].brand,
        browserVersion : window.navigator.userAgentData.brands[2].version,
        platform : window.navigator.userAgentData.platform
      },
      scrollDetails: [],
      timeSpentonPage: 0
    }

    // this.interval = setInterval(() => {
    //   this.sendData();
    // }, options.dataFrequency);
    this.currentTime = Date.now()
    this.previousScrollDepth = 0;
    this.currentScrollDepth = 0;
    this.scrollThresholds = [25, 50, 75, 100];


    // Method bindings
    this.recordScrollDepth = this.recordScrollDepth.bind(this);
    this.recordTimeOnPage = this.recordTimeOnPage.bind(this);
    this.listenerAndFindOnce = this.listenerAndFindOnce.bind(this);
    this.sendData = this.sendData.bind(this);


    // Default Event Listeners
    window.addEventListener('scroll', this.recordScrollDepth);
    window.addEventListener('beforeunload', () => {
      this.recordTimeOnPage();
      this.sendData()
    });


    if(!this.data.userData.guestId){
      const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
      .then(FingerprintJS => FingerprintJS.load())

      // Get the visitor identifier when you need it.
      fpPromise
        .then(fp => fp.get())
        .then(result => {
          // This is the visitor identifier:
          this.data.userData.guestId = result.visitorId
          localStorage.setItem('guestId', result.visitorId)
        })
    }
  }

  recordScrollDepth() {
    // Calculate current scroll depth as a percentage of the document height
    this.currentScrollDepth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);

    // Check if current scroll depth has passed any of the scroll thresholds
    for (let i = 0; i < this.scrollThresholds.length; i++) {
      if (this.currentScrollDepth >= this.scrollThresholds[i] && this.previousScrollDepth < this.scrollThresholds[i]) {
        this.data.scrollDetails.push({
          scrollDepth: this.scrollThresholds[i],
          timestamp: Date.now()
        });
      }
    }

    // Update previous scroll depth
    this.previousScrollDepth = this.currentScrollDepth;
  }

  recordTimeOnPage() {
    // Calculate time spent on page as difference between current time and page load time
    this.data.timeSpentonPage = Date.now() - this.currentTime;
  
    // Remove event listener to prevent the method from being called multiple times
    // window.removeEventListener('beforeunload', this.recordTimeOnPage);
  }

  listenerAndFindOnce(trigger, element, arr) {
    if(!element && !trigger && !arr.length) {return false}
    const listener = (event) => {
      const id = event.target.id;
      arr.forEach((query) => {
        if(query == id){
          this.data[id] = true;
          console.log(this.data);
        }
      })
    }
    element.addEventListener(trigger, listener)
  }

  sendData(){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/analytics/record-userdata', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    xhr.send(JSON.stringify(this.data));
  }

  print(){
    console.log(this.data);
  }
}