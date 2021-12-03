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
        automationName: "UiAutomator2",
        log_level: "error",
        debug: "false",
    },
    appium_lib: {
        debug: "false",
        log_level: "error",
    }
};

async function getTextOfElement(element) {
    let visualText;
    try {
        visualText = element.getText({TEXT: '*//android.widget.TextView'});
    } catch (e) {
        visualText = element.getText();
    }
    if (typeof visualText === 'string') {
        return visualText;
    }
    return Array.isArray(visualText) ? visualText.join(' ') : '';
}

const timer = ms => new Promise(res => setTimeout(res, ms))

async function load (x = 1) {
    await timer(1000*x);
}




async function main () {
    const client = await wdio.remote(opts);
    const field_name = await client.$("id:com.example.covid19_survey_cs458:id/input_name_surname");
    const field_day = await client.$("id:com.example.covid19_survey_cs458:id/input_birth_date")
    const field_month = await client.$("id:com.example.covid19_survey_cs458:id/input_birth_date2")
    const field_year = await client.$("id:com.example.covid19_survey_cs458:id/input_birth_date4")
    submit_button = await client.$("id:com.example.covid19_survey_cs458:id/submit_button")

    await field_name.setValue("Omer Olkun");
    await submit_button.click()
    await load()
    alert_ok = await client.$("id:android:id/button3")
    await alert_ok.click()
    await load()
    console.log("OK")

    // TEST 1
    // Everything is valid

    await field_name.setValue("seyhan karaca");
    await field_day.setValue("21")
    await field_month.setValue("08")
    await field_year.setValue("1990")

    await load()
    const field_city_spinner = await client.$("id:com.example.covid19_survey_cs458:id/input_city")
    await field_city_spinner.click()

    // await load()
    const field_select_city = await client.$("xpath://*[@text='ANKARA']")
    await field_select_city.click()

    // await load()
    const field_sex = await client.$("id:com.example.covid19_survey_cs458:id/input_male")
    await field_sex.click()


    const field_changes = await client.$("id:com.example.covid19_survey_cs458:id/input_changes")
    await field_changes.setValue("It was difficult to breath while stepping upstairs.")
    await load()
    await submit_button.click()
    await load()
    await alert_ok.click()
    await load()

    // const mes = await client.$("id:android:id/message")
    // var messageStr = await getTextOfElement(mes)

    // console.log(messageStr)
    // if(messageStr == 'Submission is valid')
    //     console.log('Test 1 Passed')
    // else
    //     console.log('Test 1 Failed')

    // await alert_ok.click()

    await field_name.setValue("Ome3r olkun")
    await submit_button.click()
    await alert_ok.click()
    await load()
    await field_name.setValue("Omer A Olkun")
    await submit_button.click()
    await alert_ok.click()
    await load()
    await field_name.setValue("Omer Olkun")


    // TEST 2
    // FEB30 WHICH IS INVALID
    await field_day.setValue("30")
    await field_month.setValue("02")
    await field_year.setValue("1990")
    await submit_button.click()
    await alert_ok.click()
    await load()

    await field_day.setValue("28")
    await field_month.setValue("02")
    await field_year.setValue("1990")

    // TEST 3
    await client.background(3);
    await submit_button.click()
    await alert_ok.click()

    // TEST 4
    // Turn Page and check wheter data is lost

    await client.setOrientation('LANDSCAPE');
    await client.setOrientation('PORTRAIT');

    // TEST 5
    await field_changes.setValue("I was always sick and I had no energy.")

    await submit_button.click()
    await alert_ok.click()
    await load()
    await field_changes.setValue("IwasalwayssickandIhadnoenergy.")

    for (let i = 0; i < 5; i++)
    {
        await submit_button.click()
        await alert_ok.click()
        await load()
    }
  }

  main();
