import {events} from "./configs/events";
import {swiperConfigs} from "./configs/swiper";

class Swiper {
    constructor(config, inTheEndCallback){
        this.originalPosition = 0;
        this.container = document.querySelector(config.containerSelector);
        this.pagination = document.querySelector(config.paginationSelector);
        this.sliderAmount = 0;
        this.scrollValue = config.scrollValue;
        this.transformValue = 0;
        this.currentSlide = 0;
        this.inTheEndCallback = inTheEndCallback;
        this.slideWindow = 0;

        let isMobile = ('ontouchstart' in window) 
                        || (window.DocumentTouch && document instanceof DocumentTouch);

        this.eventType = isMobile ? "mobile" : "desktop";
        this._moveHandler = this._moveHandler.bind(this);
        this._endHandler = this._endHandler.bind(this);
        this.animationTimeoutID = null;
    }
    _moveHandler(e) {
        let movePosition = e.clientX + "" || e.touches[0].clientX
        let swipePosition = -(this.originalPosition - (+movePosition)) - this.transformValue;
        this.container.style.transform = `translateX(${swipePosition}px)`;
    }
    _endHandler(e) {
        document.body.removeEventListener(events[this.eventType].move, this._moveHandler);
        document.body.removeEventListener(events[this.eventType].end, this._endHandler);

        let endPosition = e.clientX + "" || e.touches[0].clientX;
        let whereToMove = this.originalPosition < +endPosition
                            ? "left" : "right";
        
        this.slideTo(whereToMove);
    }
    slideTo(whereToMove){
        this.container.classList.add("animate");

        let transformTo = 0;
        let slideTo;
        
        if (typeof whereToMove == "string") {
            if (whereToMove == "left") {
                transformTo = this.transformValue - this.scrollValue * this.slideWindow;
                slideTo = this.currentSlide - this.slideWindow;
            }
            else {
                transformTo = this.transformValue + this.scrollValue * this.slideWindow;
                slideTo = this.currentSlide + this.slideWindow;
            }
        }
        else {
            slideTo = whereToMove * this.slideWindow;
            transformTo = this.scrollValue * whereToMove * this.slideWindow;
        }

        if (transformTo >= 0 && transformTo < this.sliderAmount * this.scrollValue) {
            this.transformValue = transformTo;
            this.currentSlide = slideTo;
            this.updatePaginationValue();

            if (this.currentSlide + 5 >= this.sliderAmount) {
                this.inTheEndCallback();
            }
        }

        this.container.style.transform = `translateX(${-this.transformValue}px)`;
        if (this.animationTimeoutID != null) {
            clearInterval(this.animationTimeoutID);
        }

        this.animationTimeoutID = setTimeout(()=>{
            this.container.classList.remove("animate");
            this.animationTimeoutID = null;
        }, 500);
    }
    initHandlers() {
        this.container.addEventListener(events[this.eventType].start, (e) => {
            this.originalPosition = e.clientX || e.touches[0].clientX;
            document.body.addEventListener(events[this.eventType].move, this._moveHandler);
            document.body.addEventListener(events[this.eventType].end, this._endHandler);
        });

        window.addEventListener("resize", this._resizeHandler.bind(this));
    }
    createPaginationDot(index){
        let dot =  document.createElement("div");
        dot.className = "dot";
        dot.dataset.index = index;
        return dot;
    }
    initPagination() {
        let dotsAmount = this.sliderAmount / this.slideWindow;
        this.pagination.innerHTML = "";
        for (let i = 0; i < dotsAmount; i++) {
            this.pagination.appendChild(this.createPaginationDot(i));
        }
    }
    updatePaginationValue(){
        let activeDot = this.pagination.querySelector(".dot.active");
        if (activeDot) {
            activeDot.classList.remove("active");
        }
        this.pagination.querySelectorAll(".dot")[Math.round(this.currentSlide/ this.slideWindow)].classList.add("active");
    }
    initPaginationClickHandler(){
        this.pagination.addEventListener("click", (e) => {
            let paginationDot = e.target;
            if (!paginationDot.matches(".dot")) {
                return;
            }
            else {
                let slideToIndex = parseInt(paginationDot.dataset.index);
                this.slideTo(slideToIndex);
            }
        })
    }
    init() {
        this._resizeHandler();
        this.initHandlers();
        this.initPaginationClickHandler();
    }
    _resizeHandler(){
        let newWidth = Math.floor(document.body.offsetWidth / this.scrollValue);
        if (newWidth !== this.slideWindow && newWidth > 0) {
            let slideTo = Math.floor(this.currentSlide / newWidth);
            this.slideWindow = newWidth;
            this.boundContainer();
            this.initPagination();
            this.slideTo(slideTo);
        }
    }
    boundContainer(){
        this.container.parentNode.style.width = this.slideWindow * this.scrollValue + "px";
    }
    loadSlides(postsArray, shouldContinue) {
        if (!shouldContinue) {
            this.transformValue = 0;
            this.currentSlide = 0;
        }
        this.container.innerHTML = "";
        this.sliderAmount = postsArray.length;

        postsArray.forEach(elem => {
            this.container.appendChild(elem);
        })

        this.initPagination();
        this.slideTo(this.currentSlide/this.slideWindow);
    }
}

export default Swiper;