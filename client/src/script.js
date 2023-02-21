let myList = []
let st = false

const lazyLoad = () =>{
    $(".storyList > div").slice(2).hide();
    var mincount = 2;
    var maxcount = 5;
    
    
    $(window).scroll(() => {
        console.log("window h = ", $(window).height());
        if($(window).scrollTop() + $(window).height() >= $(document).height() - 1000) {
            $(".storyList >div").slice(mincount,maxcount).fadeIn(1200);
    
            mincount = mincount+2;
            maxcount = maxcount+2;
            }
       })
}

const scrapeNew = async() => {
    var dta = await fetch('http://localhost:5000/scrape')
    return dta.json()
}

const recent = async() => {
    var response =  await fetch('http://localhost:5000/recent')
    return await response.json()
}
$('.scrape').on('click', async function() {
    if (this.hasAttribute("disabled")) {
       alert('Button Temporarily Disabled')
    } else {
 
        // $('.scrape').on('click',async ()=>{
            console.log('scrape option');
            $('.storyList').empty()
            $('.button').prop('disabled', true);
            $('.button').attr('disabled', true);
            $('.button').attr('disabled', 'disabled');
            // $('.button:hover::before').css({'background-color':''})
            $('.button:hover::before').css('background-color','#5c5c5ce0')
            
            myList = await scrapeNew()
        
            for(item in myList){
        
                $('.storyList').append(`
                <div class="card" href="${myList[item].link}">
                <h4>${myList[item].title}</h4>
                <h5>${myList[item].subtitle}</h5>
                <a href="${myList[item].link}" class="button darkText">See More</a>
                </div>
                `)
        
            }
        
        // })
    }
  })

$('.recent').on('click',async()=>{
    myList = await recent()
    for(item in myList){

        $('.storyList').append(`
        <div class="card" href="${myList[item].link}">
        <h4>${myList[item].title}</h4>
        <h5>${myList[item].subtitle}</h5>
        <a href="${myList[item].link}" class="button darkText">See More</a>
        </div>
        `)

    }
    lazyLoad()

})



