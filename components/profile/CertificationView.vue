<template>
  <div class="certificate-container">
    <div class="certificate">
      <div class="water-mark-overlay" />
      <div class="certificate-header">
        <img src="../../assets/images/logo.png" class="logo" alt="Logo">
      </div>
      <div class="certificate-body">
        <p class="certificate-title">
          <strong>RENR NCLEX AND CONTINUING EDUCATION (CME) Review Masters</strong>
        </p>
        <h1>Certificate of Completion</h1>
        <p class="student-name">
          Matthew Taylor
        </p>
        <div class="certificate-content">
          <div class="about-certificate">
            <p>
              has completed [hours] hours on topic title here online on Date [Date of Completion]
            </p>
          </div>
          <p class="topic-title">
            The Topic consists of [hours] Continuity hours and includes the following:
          </p>
          <div class="text-center">
            <p class="topic-description text-muted">
              Contract administrator - Types of claim - Claim Strategy - Delay analysis - The preliminaries to a claim - The essential elements to a successful claim - Responses - Claim preparation and presentation
            </p>
          </div>
        </div>
        <div class="certificate-footer text-muted">
          <div class="row">
            <div class="col-md-6">
              <p>Principal: ______________________</p>
            </div>
            <div class="col-md-6">
              <div class="row">
                <div class="col-md-6">
                  <p>Accredited by</p>
                </div>
                <div class="col-md-6">
                  <p>Endorsed by</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <style scoped>
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
  }

  .certificate-container {
    padding: 5% 10%;
    max-width: 1024px;
    margin: 0 auto;
  }

  .certificate {
    border: 20px solid #0C5280;
    padding: 25px;
    height: auto;
    position: relative;
    background: #fff;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  }

  .certificate:after {
    content: '';
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    background-image: url(https://image.ibb.co/ckrVv7/water_mark_logo.png);
    background-size: 100%;
    z-index: -1;
    opacity: 0.1;
  }

  .certificate-header > .logo {
    width: 80px;
    height: 80px;
  }

  .certificate-title {
    text-align: center;
    color: #0C5280;
  }

  h1 {
    font-weight: 400;
    font-size: 36px;
    color: #0C5280;
    margin-bottom: 20px;
  }

  .student-name {
    font-size: 24px;
    color: #555;
    margin-bottom: 20px;
  }

  .certificate-content {
    max-width: 750px;
    margin: 0 auto;
  }

  .about-certificate {
    width: 100%;
  }

  .topic-description {
    text-align: center;
    color: #888;
  }

  .certificate-footer {
    margin-top: 30px;
  }

  .certificate-footer p {
    margin: 5px 0;
    color: #888;
  }
  </style>
