// Một số bài hát có thể bị lỗi do liên kết bị hỏng. Vui lòng thay thế liên kết khác để có thể phát
// Some songs may be faulty due to broken links. Please replace another link so that it can be played

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "F8_PLAYER";

const player = $(".player");
const itemTitle = $('.item-title');
const itemAuthor = $('.is-one-line');
const cd = $(".cd");
const title = $(".title");
const artist = $(".artists");
const cdThumb = $(".cd-thumb");
const imageThumb = $(".image-thumb");
console.log(imageThumb)
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const song_list = $(".song_lists");
const btnplayall = $(".btn-play-all");
const textPlay = $('.text-play');
const icon = $('.icon-pause');
const timeMusic = $('#time-music-1');
const myVideo = $('#myVideo')
console.log(timeMusic);

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: {},
    // (1/2) Uncomment the line below to use localStorage
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    songs:
        [
            {
                Id: "1",
                name: "Nơi này có em",
                singer: "Sơn Tùng mtp",
                path: "./assets/music/song_1.mp3",
                image: "./assets/img/Tu-Chuyen1.jpg"
            },
            {
                Id: "2",
                name: "Nevada",
                singer: "Vicetone",
                path: "./assets/music/song_2.mp3",
                image: "./assets/img/img_2.jpg"
            },
            {
                Id: "3",
                name: "Đắm",
                singer: "Xesi, Ricky Star",
                path: "./assets/music/song_3.mp3",
                image: "./assets/img/img_3.jpg"
            },
            {
                Id: "4",
                name: "Stay",
                singer: "Justin Biber",
                path: "./assets/music/song_4.mp3",
                image: "./assets/img/img_4.jpg"
            },
            {
                Id: "5",
                name: "Bài ca tuổi trẻ",
                singer: "Tam Ca PKL",
                path: "./assets/music/song_5.mp3",
                image: "./assets/img/img_5.jpg"
            },
            {
                Id: "6",
                name: "Cho tôi đi theo",
                singer: "Ngọt",
                path: "./assets/music/song_6.mp3",
                image: "./assets/img/img_6.jpg"
            },
            {
                Id: "7",
                name: "Để tôi ôm em bằng giai điệu này",
                singer: "Kai Đinh x Min",
                path: "./assets/music/song_7.mp3",
                image: "./assets/img/img_7.jpg"
            },
            {
                Id: "8",
                name: "Ai chung tình được mãi",
                singer: "Đinh Tùng Huy",
                path: "./assets/music/song_8.mp3",
                image: "./assets/img/img_8.webp"
            },
            {
                Id: "9",
                name: "Anh sai rồi",
                singer: "Sơn Tùng mtp",
                path: "./assets/music/song_9.mp3",
                image: "./assets/img/img_9.webp"
            },
            {
                Id: "10",
                name: "À Lôi",
                singer: "Double2T",
                path: "./assets/music/song_10.mp3",
                image: "./assets/img/img_10.jpg"
            },
        ],
    setConfig: function (key, value) {
        this.config[key] = value;
        // (2/2) Uncomment the line below to use localStorage
        localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                    <div class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
                        <div class="infor">
                            <div class="number"> ${song.Id} </div>
                            <div class="img-thumb" style="background-image: url('${song.image}')"> </div>
                            <div class="infor_song">
                            <h3 class="name">${song.name}</h3>
                            <h5 class="author">${song.singer}</h5>
                        </div>
                    </div>
                        <div id="time-music-1">03:32</div>
                        </div>
            `
        })
        song_list.innerHTML = htmls.join("");
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        });
    },
    handleEvents: function () {
        const _this = this;
        // Handle CD spins / stops
        const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        });
        cdThumbAnimate.pause();

        // Xử lý phóng to / thu nhỏ CD
        // Handles CD enlargement / reduction
        // document.onscroll = function () {
        //     const scrollTop = window.scrollY || document.documentElement.scrollTop;
        //     const newCdWidth = cdWidth - scrollTop;

        //     cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
        //     cd.style.opacity = newCdWidth / cdWidth;
        // };

        // Xử lý khi click play
        // Handle when click play
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
                myVideo.pause();
            } else {
                audio.play();
                myVideo.play();
            }
        };

        btnplayall.onclick = () => {
            if (app.isPlaying) {
                audio.pause();
                myVideo.pause();
            } else {
                audio.play();
                myVideo.play();
            }
        }

        // Khi song được play
        // When the song is played
        audio.onplay = function () {
            _this.isPlaying = true;
            cd.classList.add("playing");
            player.classList.add("playing")
            cdThumbAnimate.play();
            textPlay.innerHTML = "PAUSE"
        };

        // Khi song bị pause
        // When the song is pause
        audio.onpause = function () {
            _this.isPlaying = false;
            cd.classList.remove("playing");
            player.classList.remove("playing")
            cdThumbAnimate.pause();
            textPlay.innerHTML = "CONTINUTE PLAYING"
        };

        // Khi tiến độ bài hát thay đổi
        // When the song progress changes
        // audio.ontimeupdate = function () {
        //     if (audio.duration) {
        //         const progressPercent = Math.floor(
        //             (audio.currentTime / audio.duration) * 100
        //         );
        //         progress.value = progressPercent;
        //     }
        // };

        // // Xử lý khi tua song
        // // Handling when seek
        // progress.onchange = function (e) {
        //     const seekTime = (audio.duration / 100) * e.target.value;
        //     audio.currentTime = seekTime;
        // };

        // Khi next song
        // When next song
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };

        // Khi prev song
        // When prev song
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        };

        // Xử lý bật / tắt random song
        // Handling on / off random song
        randomBtn.onclick = function (e) {
            _this.isRandom = !_this.isRandom;
            _this.setConfig("isRandom", _this.isRandom);
            randomBtn.classList.toggle("active", _this.isRandom);
        };

        // Xử lý lặp lại một song
        // Single-parallel repeat processing
        repeatBtn.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig("isRepeat", _this.isRepeat);
            repeatBtn.classList.toggle("active", _this.isRepeat);
        };

        // Xử lý next song khi audio ended
        // Handle next song when audio ended
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        // Lắng nghe hành vi click vào playlist
        // Listen to playlist clicks
        song_list.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.active)");

            if (songNode || e.target.closest(".option")) {
                // Xử lý khi click vào song
                // Handle when clicking on the song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }

                // Xử lý khi click vào song option
                // Handle when clicking on the song option
                if (e.target.closest(".option")) {
                }
            }
        };
    },

    scrollToActiveSong: function () {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });
        }, 300);
    },

    loadCurrentSong: function () {
        title.textContent = this.currentSong.name;
        artist.textContent = this.currentSong.singer;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
        imageThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        itemAuthor.innerHTML = this.currentSong.singer;
        itemTitle.innerHTML = this.currentSong.name;
    },


    loadConfig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    start: function () {
        // Gán cấu hình từ config vào ứng dụng
        // Assign configuration from config to application
        this.loadConfig();

        // Định nghĩa các thuộc tính cho object
        // Defines properties for the object
        this.defineProperties();

        // Lắng nghe / xử lý các sự kiện (DOM events)
        // Listening / handling events (DOM events)
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        // Load the first song information into the UI when running the app
        this.loadCurrentSong();

        // Render playlist
        this.render();

        // Hiển thị trạng thái ban đầu của button repeat & random
        // Display the initial state of the repeat & random button
        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active", this.isRepeat);
    }
};

app.start();
