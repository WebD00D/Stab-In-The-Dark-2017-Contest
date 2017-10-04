window.addEventListener("load", function(event) {

    const submitEmailBtn = document.getElementById("js_submitEmail")
    submitEmailBtn.onclick = function(){

      const email = document.getElementById("email").value;

      // TODO: Save to Firebase DB, send to Node backend where we will send to
      // Campaign Monitor.

      // TODO: Set Cookie, or Data Attribue with submitte email, so
      // we can reference when submitting the poll.
      document.getElementsByClassName("page")[0].setAttribute("data-email", email);

      // TODO: Show Survey.

      document.getElementsByClassName("js_section_one")[0].classList.add("d-none");
      document.getElementsByClassName("js_section_two")[0].classList.remove("d-none");


    }

    const submitEntry = document.getElementById("js_submitEntry")
    submitEntry.onclick = function(){

      // TODO: Grab selected shaper and Email

      const email = document.getElementsByClassName("page")[0].getAttribute("data-email");
      const shaper = document.querySelector('input[name = "shaper"]:checked').value;
      alert(email + ' ' + shaper );

    }




});
