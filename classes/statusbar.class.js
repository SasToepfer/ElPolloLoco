class Statusbar extends Actor {
    IMAGES = [
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png",
        "img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png"
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 40;
        this.setPercentage(100);
        
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path]
    }

    resolveImageIndex() {
        switch (true) {
            case this.percentage == 100: return 0;
            case this.percentage > 80: return 1;
            case this.percentage > 60: return 2;
            case this.percentage > 40: return 3;
            case this.percentage > 20: return 4;
            case this.percentage >= 0: return 5;
        }
    }
}