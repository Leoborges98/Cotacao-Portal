document.addEventListener("DOMContentLoaded", () => {

    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".sidebar-overlay");

    const desktop = document.getElementById("toggleSidebar");
    const mobile = document.getElementById("toggleSidebarMobile");

    if(desktop){

        desktop.addEventListener("click",()=>{

            sidebar.classList.toggle("collapsed");

        });

    }

    if(mobile){

        mobile.addEventListener("click",()=>{

            sidebar.classList.toggle("show");
            overlay.classList.toggle("show");

        });

    }

});