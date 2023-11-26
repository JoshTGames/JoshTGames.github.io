const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        switch(entry.isIntersecting){
            case true:
                if(entry.target.contains("show")){ break; }
                entry.target.classList.add("show");
                break;
            case false:
                // entry.target.classList.remove("show");
                break;
        }
    });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((element) => observer.observe(element));