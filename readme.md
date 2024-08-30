# Boozang Docker Test runner container (XVFB + Playwright)

[`styrman/boozang`](https://hub.docker.com/r/styrman/boozang-playwright/)

A [Boozang](https://boozang.com/) container, based on the official Playwright Docker container: hmcr.microsoft.com/playwright:bionic, to run Boozang tests in a browser with Xvfb.

## Description

This container executes a *Boozang* test (or test suite) defined by the provided *Boozang* test URL, in an [Chromium](https://www.chromium.org/) browser (via [Microsoft Playwright](https://github.com/microsoft/playwright)) using a virtual frame buffer (Xvfb).

It returns an error code if the test fails, and its report can be accessed thanks to a docker volume.

This container is mainly designed to be integrated to a *Continuous Integration* workflow.

### Requirement

Make sure to install Docker on your machine, and have a test created on the Boozang platform. Get the URL from the browser window by clicking the share icon or copy it from the browser window. 

Get the authorization token (for non-public projects) on Boozang management (http://ai.boozang.com) -> Account -> Get Token.

## Usage

### Basic

The base command takes the **test URL** as a mandatory parameter:

`docker run --rm  -v "$(pwd):/var/boozang/" styrman/boozang-playwright "https://ai.boozang.com/extension?token=XXXXXXXXXXXXXXXXX5d35df3dd337ee52f36b113e#5d35df3dd337ee52f36b113e/0.0.1/m4/t3/"`

* `--rm` can be specified to remove the container after the test execution.
* `--shm-size 1G` should be specified to increase the memory available for the virtual browser

The command outputs the test steps and result to the console, and returns the following exit codes:

* 0 if the tests succeeded
* 1 if the tests failed
* 2 in case of any other error

### Options

The following options can be specified.

* `device`: define a specific [device](https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js) to run the tests
* `timeout`: define the command timeout time in seconds
* `token`: add a *Boozang* user token to the URL, to allow user connection. The token can also be directly specified in the URL. In this case, the environment variable token will be ignored.
* `file`: define the report and screenshot file name (without an extension). If not specified, the name is `boozang` followed by the date and time
* `screenshot`: if *true*, a screenshot is taken two seconds after opening the URL.

Example:

`docker run --rm  -v "$(pwd):/var/boozang/" styrman/boozang-playwright --screenshot "https://ai.boozang.com/extension?token=XXXXXXXXXXXXXXXXX5d35df3dd337ee52f36b113e#5d35df3dd337ee52f36b113e/0.0.1/m4/t3/"`


### Accessing reports

The report and screenshot are written to the container `/var/boozang` volume.

To retrieve them, the volume can be mapped to a local directory, this way:

`docker run --rm  -v "$(pwd):/var/boozang/" styrman/boozang-playwright "https://ai.boozang.com/extension?token=XXXXXXXXXXXXXXXXX5d35df3dd337ee52f36b113e#5d35df3dd337ee52f36b113e/0.0.1/m4/t3/"`