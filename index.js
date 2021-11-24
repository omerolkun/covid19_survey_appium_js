const wdio = require("webdriverio");
const assert = require("assert");
const { close } = require('fs');



const opts = {
    path: '/wd/hub',
    port: 4723,
    capabilities: {
      platformName: "Android",
      platformVersion: "11",
      deviceName: "23e0f248",
      app: "/home/omergenc/Downloads/covid19survey.apk",
      appPackage: "com.example.covid19_survey_cs458",
      appActivity: ".MainActivity",
      automationName: "UiAutomator2"
    }
  };
  
  async function main () {
    const client = await wdio.remote(opts);
  
    const field_name = await client.$("id:com.example.covid19_survey_cs458:id/input_name_surname");
    await field_name.setValue("Omer Olkun");
    
    submit_button = await client.$("id:com.example.covid19_survey_cs458:id/submit_button")
    submit_button.click()

    alert_ok = await client.$("id:android:id/button3")
    alert_ok.click()


    //submit_button = await client.$("id:com.example.survet_basic_act_nov12_junk:id/sumbit_button")
    //submit_button.click()

    //close_alert_button = await client.$("id:android:id/button3")
    // await close_alert_button.waitForDisplayed({timeout: 10000});
    //close_alert_button.click(); 
  }
  
  main();
  