window.addEventListener("load", function(event) {

  const submitEmailBtn = document.getElementById("js_submitEmail");
  submitEmailBtn.onclick = function() {


    const email = document.getElementById("email").value;
    document.getElementById("errormessage").classList.add("d-none");

    var has_submitted = localStorage.getItem("stab_x_vonu");
    if ( has_submitted ) {
      document.getElementById("errormessage").innerHTML = "Looks like you've already entered to win."
      document.getElementById("errormessage").classList.remove("d-none");
      return;
    }

    if (!validateEmail(email)) {
      document.getElementById("errormessage").classList.remove("d-none");
      return;
    }

    const social = document.getElementById("social").value
    if ( !social || 0 === social.length ) {
      document.getElementById("errormessage").innerHTML = "Please enter a valid social media handle."
      document.getElementById("errormessage").classList.remove("d-none");
      return;
    }


    $.ajax({
      method: "POST",
      url: "/sumbit-email",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({ email: email, social: social })
    }).done(function(msg) {
      console.log("done");
    });

  //  localStorage.setItem('stab_x_vonu', true);

    document
      .getElementsByClassName("page")[0]
      .setAttribute("data-email", email);

    document
      .getElementsByClassName("page")[0]
      .setAttribute("data-social", social);

    document
      .getElementsByClassName("js_section_one")[0]
      .classList.add("d-none");
    document
      .getElementsByClassName("js_section_two")[0]
      .classList.remove("d-none");

      document.getElementsByClassName("section__image__filter")[0]
      .classList.remove("section__image__filter--light")

      document.getElementsByClassName("section__image")[0]
      .classList.remove("section__image--first");

      document.getElementsByClassName("section__image")[0]
      .classList.add("section__image--second");


  };


  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const submitEntry = document.getElementById("js_submitEntry");
  submitEntry.onclick = function() {

    const email = document
      .getElementsByClassName("page")[0]
      .getAttribute("data-email");

      if ( !document.querySelector('input[name = "island"]:checked') ) {
        document
          .getElementById("errormessage__shaper")
          .classList.remove("d-none");
        return;
      }

    const island = document.querySelector('input[name = "island"]:checked').value;


    const social = document
        .getElementsByClassName("page")[0]
        .getAttribute("data-social");

    $.ajax({
      method: "POST",
      url: "/sumbit-survey",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({ email: email, social: social, island: island })
    }).done(function(msg) {
      console.log("done");
    });

    // TODO: Show Success

    document.getElementsByClassName("section__image")[0]
    .classList.remove("section__image--second");

    document.getElementsByClassName("section__image")[0]
    .classList.add("section__image--third");

    document
      .getElementsByClassName("js_section_two")[0]
      .classList.add("d-none");

    document
      .getElementsByClassName("js_section_three")[0]
      .classList.remove("d-none");
  };







  document.getElementsByClassName("js-mail")[0].onclick = function() {
    addToShareList("email");
    document.getElementById("lnkEmail").click();
  };

  document.getElementsByClassName("js-tweet")[0].onclick = function() {
    addToShareList("twitter");
    document.getElementById("lnkTwitter").click();
  };

  document.getElementsByClassName("js-share-fb")[0].onclick = function() {
    addToShareList("facebook");
    document.getElementById("lnkFacebook").click();
  };


  function addToShareList(type) {

    const email = document
      .getElementsByClassName("page")[0]
      .getAttribute("data-email");

    const social = document
        .getElementsByClassName("page")[0]
        .getAttribute("data-social");

    $.ajax({
      method: "POST",
      url: "/shared-list",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({ email: email, social: social, type: type  })
    }).done(function(msg) {
      console.log("done");
    });

  }

});
