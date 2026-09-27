document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const SHOWS = {
        "daily-tech": {
            title: "The Daily Tech",
            author: "Sarah Chen",
            image: "images/daily tech.jpeg",
            category: "Technology",
            subscribers: "1.2M subscribers",
            episodeCount: "245 episodes",
            description:
                "Your daily dose of technology news, trends, and insights from Silicon Valley and beyond. Join us as we explore the latest innovations shaping our digital future.",
            startTime: 2700,
            hasEpisodes: true,
            episodes: [
                {
                    number: "01",
                    title: "The AI Revolution: What's Next?",
                    show: "The Daily Tech",
                    date: "2024-01-15",
                    duration: 2732,
                    displayDuration: "45:32",
                    startTime: 2700
                },
                {
                    number: "02",
                    title: "Apple Vision Pro: First Impressions",
                    show: "The Daily Tech",
                    date: "2024-01-12",
                    duration: 2295,
                    displayDuration: "38:15",
                    startTime: 0
                }
            ]
        },

        "mystery-files": {
            title: "Mystery Files",
            author: "Detective Audio",
            image: "images/Mystery Files.jpeg",
            category: "True Crime",
            subscribers: "2.5M subscribers",
            episodeCount: "189 episodes",
            description:
                "Dive deep into unsolved mysteries, cold cases, and fascinating criminal investigations. Each episode unravels a new puzzle.",
            startTime: 0,
            hasEpisodes: true,
            episodes: [
                {
                    number: "01",
                    title: "The Disappearance of Flight 370",
                    show: "Mystery Files",
                    date: "2024-01-14",
                    duration: 3168,
                    displayDuration: "52:48",
                    startTime: 0
                }
            ]
        },

        "laugh-track": {
            title: "Laugh Track",
            author: "Comedy Central",
            image: "images/Laugh Track.jpeg",
            category: "Comedy",
            subscribers: "890K subscribers",
            episodeCount: "312 episodes",
            description:
                "Stand-up highlights, comedy sketches, and hilarious conversations with the funniest people in entertainment.",
            startTime: 0,
            hasEpisodes: true,
            episodes: [
                {
                    number: "01",
                    title: "Comedy Gold: Best of 2023",
                    show: "Laugh Track",
                    date: "2024-01-10",
                    duration: 3750,
                    displayDuration: "1:02:30",
                    startTime: 0
                }
            ]
        },

        "science-unlocked": {
            title: "Science Unlocked",
            author: "Dr. Maya Williams",
            image: "images/Science Unlocked.jpeg",
            category: "Science",
            subscribers: "750K subscribers",
            episodeCount: "156 episodes",
            description:
                "Breaking down complex scientific concepts into fascinating stories. From quantum physics to evolutionary biology.",
            startTime: 0,
            hasEpisodes: true,
            episodes: [
                {
                    number: "01",
                    title: "The James Webb Telescope: New Discoveries",
                    show: "Science Unlocked",
                    date: "2024-01-13",
                    duration: 2480,
                    displayDuration: "41:20",
                    startTime: 0
                }
            ]
        },

        "morning-briefing": {
            title: "Morning Briefing",
            author: "Global News Network",
            image: "images/Morning Briefing.jpeg",
            category: "News",
            subscribers: "3.1M subscribers",
            episodeCount: "520 episodes",
            description:
                "Start your day informed with comprehensive news coverage from around the world.",
            startTime: 0,
            hasEpisodes: true,
            episodes: [
                {
                    number: "01",
                    title: "Global Markets Update: January 2024",
                    show: "Morning Briefing",
                    date: "2024-01-15",
                    duration: 1725,
                    displayDuration: "28:45",
                    startTime: 0
                }
            ]
        },

        "startup-stories": {
            title: "Startup Stories",
            author: "Venture Voice",
            image: "images/Startup Stories.jpeg",
            category: "Business",
            subscribers: "420K subscribers",
            episodeCount: "98 episodes",
            description:
                "Behind-the-scenes stories from founders who built billion-dollar companies.",
            startTime: 0,
            hasEpisodes: true,
            episodes: [
                {
                    number: "01",
                    title: "From Garage to $10B: The Stripe Story",
                    show: "Startup Stories",
                    date: "2024-01-20",
                    duration: 3312,
                    displayDuration: "55:12",
                    startTime: 0
                }
            ]
        },

        "mindful-moments": {
            title: "Mindful Moments",
            author: "Wellness Weekly",
            image: "images/Mindful Moments.jpeg",
            category: "Health",
            subscribers: "1.8M subscribers",
            episodeCount: "234 episodes",
            description:
                "Gentle conversations and practical moments for a calmer, more mindful day.",
            startTime: 0,
            hasEpisodes: true,
            episodes: [
                {
                    number: "01",
                    title: "A Calm Start to Your Day",
                    show: "Mindful Moments",
                    date: "2024-01-18",
                    duration: 750,
                    displayDuration: "12:30",
                    startTime: 0
                }
            ]
        },

        "future-forward": {
            title: "Future Forward",
            author: "Innovation Lab",
            image: "images/Future Forward.jpeg",
            category: "Technology",
            subscribers: "560K subscribers",
            episodeCount: "87 episodes",
            description: "Exploring the technologies and ideas that will shape tomorrow.",
            startTime: 0,
            hasEpisodes: false,
            episodes: []
        }
    };

    Object.keys(SHOWS).forEach(function (showId) {
        const show = SHOWS[showId];

        show.episode = show.episodes[0]?.title || "";
        show.duration = show.episodes[0]?.duration || 0;
        show.startTime = show.episodes[0]?.startTime || 0;
    });

    const SHOW_ORDER = Object.keys(SHOWS);


    const pageName = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    const isLibraryPage = pageName === "library.html";
    const isExplorePage = pageName === "explore.html";
    const isSettingsPage =
        pageName === "setting.html" ||
        pageName === "settings.html";

    const isHomePage =
        !isLibraryPage &&
        !isExplorePage &&
        !isSettingsPage;
    const navigationEntry =
    performance.getEntriesByType?.("navigation")?.[0];

const isFullRefresh =
    navigationEntry?.type === "reload";

const refreshShowId =
    new URLSearchParams(window.location.search).get("show");


if (isFullRefresh) {

    sessionStorage.removeItem("echoNavigationRestore");
    localStorage.removeItem("echoPlayerState");

    if (
        refreshShowId &&
        SHOWS[refreshShowId]
    ) {
        window.location.replace("index.html");
        return;
    }
}


if (isFullRefresh && !isHomePage) {
    sessionStorage.removeItem("echoNavigationRestore");
    localStorage.removeItem("echoPlayerState");
    window.location.replace("index.html");
    return;
}
    document.body.classList.toggle(
        "echo-home-page",
        isHomePage
    );

    document.body.classList.toggle(
        "echo-library-page",
        isLibraryPage
    );

    document.body.classList.toggle(
        "echo-explore-page",
        isExplorePage
    );

    document.body.classList.toggle(
        "echo-settings-page",
        isSettingsPage
    );
    const musicPlayer =
        document.getElementById("musicPlayer");

    const playerEmpty =
        document.getElementById("playerEmpty");

    const playerImage =
        document.getElementById("playerImage");

    const playerTitle =
        document.getElementById("playerTitle");

    const playerShow =
        document.getElementById("playerShow");

    const mainPlay =
        document.getElementById("mainPlay");

    const previousButton =
        document.getElementById("previousButton");

    const nextButton =
        document.getElementById("nextButton");

    const fullscreenButton =
        document.getElementById("fullscreenButton");

    const fullscreenPlayer =
        document.getElementById("fullscreenPlayer");

    const fullscreenClose =
        document.getElementById("fullscreenClose");

    const fullscreenImage =
        document.getElementById("fullscreenImage");

    const fullscreenTitle =
        document.getElementById("fullscreenTitle");

    const fullscreenShow =
        document.getElementById("fullscreenShow");

    const fullscreenPlay =
        document.getElementById("fullscreenPlay");

    const fullscreenPrevious =
        document.getElementById("fullscreenPrevious");

    const fullscreenNext =
        document.getElementById("fullscreenNext");

    const fullscreenProgress =
        document.getElementById("fullscreenProgress") ||
        document.querySelector(
            "#fullscreenPlayer .fullscreen-progress"
        );

    const fullscreenProgressFill =
        document.getElementById(
            "fullscreenProgressFill"
        ) ||
        document.querySelector(
            "#fullscreenPlayer .fullscreen-progress-fill"
        );

    const fullscreenProgressDot =
        document.getElementById(
            "fullscreenProgressDot"
        ) ||
        document.querySelector(
            "#fullscreenPlayer .fullscreen-progress-dot"
        );

    const fullscreenTimeLabels =
        fullscreenPlayer
            ? Array.from(
                  fullscreenPlayer.querySelectorAll(
                      ".fullscreen-time span"
                  )
              )
            : [];

    const fullscreenVolumeBar =
        document.getElementById(
            "fullscreenVolumeBar"
        );

    const showPageSection =
        document.getElementById("show-details-page");

    const showCover =
        document.getElementById("showCover");

    const showCategory =
        document.getElementById("showCategory");

    const showTitle =
        document.getElementById("showTitle");

    const showAuthor =
        document.getElementById("showAuthor");

    const showSubscribers =
        document.getElementById("showSubscribers");

    const showEpisodeCount =
        document.getElementById(
            "showEpisodeCount"
        );

    const showDescription =
        document.getElementById("showDescription");

    const hostName =
        document.getElementById("hostName");

    const hostRole =
        document.getElementById("hostRole");

    const showEpisodesList =
        document.getElementById(
            "showEpisodesList"
        );

    const showAboutSection =
        document.getElementById("showAbout");

    const showEpisodesTab =
        document.getElementById(
            "showEpisodesTab"
        );

    const showAboutTab =
        document.getElementById("showAboutTab");

    const latestEpisodeButton =
        document.getElementById(
            "latestEpisodeButton"
        );

    const normalVolumeBar =
        document.querySelector(
            ".music-player .volume-bar"
        );

    const normalVolumeProgress =
        document.querySelector(
            ".music-player .volume-progress"
        );

    const normalVolumeDot =
        document.getElementById("volumeDot");

    let currentEpisode = null;
    let currentShowId = "";
    let currentTime = 0;
    let isPlaying = false;
    let playbackTimer = null;

    const PLAYBACK_SPEEDS = [
        0.5,
        0.75,
        1,
        1.25,
        1.5,
        1.75,
        2
    ];

    let playbackSpeed =
        Number(
            localStorage.getItem(
                "echoPlaybackSpeed"
            )
        );

    let volume =
        Number(
            localStorage.getItem(
                "echoVolumeLevel"
            )
        );

    if (!PLAYBACK_SPEEDS.includes(playbackSpeed)) {
        playbackSpeed = 1;
    }

    if (!Number.isFinite(volume)) {
        volume = 0.7;
    }

    volume = Math.max(
        0,
        Math.min(1, volume)
    );

    function normalize(value) {
        return String(value || "")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();
    }

    function formatTime(seconds) {
        const total =
            Math.max(
                0,
                Math.floor(
                    Number(seconds) || 0
                )
            );

        const hours =
            Math.floor(total / 3600);

        const minutes =
            Math.floor(
                (total % 3600) / 60
            );

        const secs =
            total % 60;

        if (hours > 0) {
            return (
                hours +
                ":" +
                String(minutes).padStart(2, "0") +
                ":" +
                String(secs).padStart(2, "0")
            );
        }

        return (
            minutes +
            ":" +
            String(secs).padStart(2, "0")
        );
    }

    function getShowIdFromElement(element) {
        if (!element) return "";

        if (
            element.dataset?.showId &&
            SHOWS[element.dataset.showId]
        ) {
            return element.dataset.showId;
        }

        const section =
            element.closest(".show-details");

        if (
            section &&
            SHOWS[section.id]
        ) {
            return section.id;
        }

        const text = normalize(
            [
                element.dataset?.show,
                element.dataset?.title,
                element.textContent,
                element.querySelector?.("img")?.alt
            ]
                .filter(Boolean)
                .join(" ")
        );

        for (const showId of SHOW_ORDER) {
            if (
                text.includes(
                    normalize(
                        SHOWS[showId].title
                    )
                )
            ) {
                return showId;
            }

            if (
                text.includes(
                    normalize(
                        SHOWS[showId].author
                    )
                )
            ) {
                return showId;
            }
        }

        return "";
    }

    function getShowImage(showId) {
        const card = Array.from(
            document.querySelectorAll(
                ".podcast-card, .library-card, .chart-card"
            )
        ).find(function (item) {
            return (
                getShowIdFromElement(item) ===
                showId
            );
        });

        const cardImage =
            card?.querySelector("img");

        if (cardImage?.src) {
            return cardImage.src;
        }

        return (
            SHOWS[showId]?.image ||
            ""
        );
    }

    function getEpisodeTitle(element) {
        if (!element) {
            return "Episode";
        }

        if (
            element.dataset?.title?.trim()
        ) {
            return element.dataset.title.trim();
        }

        const heading =
            element.querySelector(
                ".episode-content h3, " +
                ".episode-details h3, " +
                ".episode-title, h3, h2"
            );

        if (heading?.textContent.trim()) {
            return heading.textContent
                .replace(/\s+/g, " ")
                .trim();
        }

        const showId =
            getShowIdFromElement(element);

        return (
            SHOWS[showId]?.episode ||
            "Episode"
        );
    }

    function findEpisodeData(
        showId,
        title,
        index
    ) {
        const show = SHOWS[showId];

        if (
            !show ||
            !Array.isArray(show.episodes)
        ) {
            return null;
        }

        if (
            Number.isInteger(index) &&
            show.episodes[index]
        ) {
            return show.episodes[index];
        }

        const wanted =
            normalize(title);

        return (
            show.episodes.find(
                function (episode) {
                    return (
                        normalize(
                            episode.title
                        ) === wanted
                    );
                }
            ) ||
            show.episodes[0] ||
            null
        );
    }

    function getEpisodeDuration(element) {
        const showId =
            getShowIdFromElement(element);

        const show =
            SHOWS[showId];

        if (
            element?.dataset?.duration
        ) {
            const value =
                Number(
                    element.dataset.duration
                );

            if (
                Number.isFinite(value) &&
                value > 0
            ) {
                return value;
            }
        }

        const text =
            element?.textContent || "";

        const matches =
            text.match(
                /(?:\d+:)?\d{1,2}:\d{2}/g
            );

        if (matches?.length) {
            const parts =
                matches[
                    matches.length - 1
                ]
                    .split(":")
                    .map(Number);

            if (parts.length === 2) {
                return (
                    parts[0] * 60 +
                    parts[1]
                );
            }

            if (parts.length === 3) {
                return (
                    parts[0] * 3600 +
                    parts[1] * 60 +
                    parts[2]
                );
            }
        }

        return show?.duration || 0;
    }

    function createEpisodeFromElement(
        element
    ) {
        if (!element) return null;

        const showId =
            getShowIdFromElement(element);

        const show =
            SHOWS[showId];

        if (
            !show ||
            !show.hasEpisodes
        ) {
            return null;
        }

        const isSubscribedShowCard =
            element.classList.contains(
                "library-card"
            );

        const rawIndex =
            Number(
                element.dataset?.episodeIndex
            );

        const index =
            Number.isInteger(rawIndex)
                ? rawIndex
                : null;

        const title =
            isSubscribedShowCard
                ? (
                      show.episodes[0]?.title ||
                      show.episode ||
                      "Episode"
                  )
                : getEpisodeTitle(element);

        const episodeData =
            isSubscribedShowCard
                ? (
                      show.episodes[0] ||
                      null
                  )
                : findEpisodeData(
                      showId,
                      title,
                      index
                  );

        const rawStart =
            Number(
                element.dataset?.startTime
            );

        const startTime =
            Number.isFinite(rawStart)
                ? Math.max(0, rawStart)
                : Math.max(
                      0,
                      Number(
                          episodeData?.startTime
                      ) || 0
                  );

        const duration =
            getEpisodeDuration(element) ||
            Number(
                episodeData?.duration
            ) ||
            show.duration;

        return {
            element,
            showId,
            title,
            show: show.title,
            author: show.author,
            image:
                element.querySelector(
                    "img"
                )?.src ||
                getShowImage(showId),
            duration,
            startTime,
            displayStartTime:
                startTime,
            displayDuration:
                episodeData?.displayDuration ||
                formatTime(duration)
        };
    }

    function createEpisodeFromShow(
        showId
    ) {
        const show =
            SHOWS[showId];

        if (
            !show ||
            !show.hasEpisodes
        ) {
            return null;
        }

        const firstEpisode =
            show.episodes[0] ||
            null;

        return {
            element: null,
            showId,
            title: show.episode,
            show: show.title,
            author: show.author,
            image: getShowImage(showId),
            duration: show.duration,
            startTime: show.startTime,
            displayStartTime:
                firstEpisode?.startTime ??
                show.startTime,
            displayDuration:
                firstEpisode?.displayDuration ||
                formatTime(show.duration)
        };
    }
    function updatePlayIcon() {
        [
            mainPlay,
            fullscreenPlay
        ].forEach(function (button) {
            if (!button) return;

            const playIcon =
                button.querySelector(
                    ".play-icon"
                );

            const pauseIcon =
                button.querySelector(
                    ".pause-icon"
                );

            if (
                playIcon &&
                pauseIcon
            ) {
                playIcon.style.display =
                    isPlaying
                        ? "none"
                        : "block";

                pauseIcon.style.display =
                    isPlaying
                        ? "block"
                        : "none";
            }

            button.setAttribute(
                "aria-label",
                isPlaying
                    ? "Pause"
                    : "Play"
            );
        });
    }

    function updateSpeedLabel() {
        document
            .querySelectorAll(
                ".speed-button"
            )
            .forEach(function (button) {
                button.textContent =
                    String(
                        playbackSpeed
                    ) + "x";
            });
    }

    function updateNormalVolume() {
        const percent =
            Math.max(
                0,
                Math.min(
                    100,
                    volume * 100
                )
            );

        const position =
            percent + "%";

        if (normalVolumeBar) {
            normalVolumeBar.style.setProperty(
                "--echo-volume",
                position
            );

            normalVolumeBar.setAttribute(
                "aria-valuenow",
                String(
                    Math.round(percent)
                )
            );
        }

        if (normalVolumeProgress) {
            normalVolumeProgress.style.setProperty(
                "--echo-volume",
                position
            );

            normalVolumeProgress.style.setProperty(
                "width",
                position,
                "important"
            );
        }

        if (normalVolumeDot) {
            normalVolumeDot.style.setProperty(
                "--echo-volume",
                position
            );

            normalVolumeDot.style.setProperty(
                "left",
                position,
                "important"
            );
        }

        if (fullscreenVolumeBar) {
            fullscreenVolumeBar.style.setProperty(
                "--echo-volume",
                position
            );

            fullscreenVolumeBar.setAttribute(
                "aria-valuenow",
                String(
                    Math.round(percent)
                )
            );
        }

        const fill =
            document.querySelector(
                "#fullscreenVolumeBar .fullscreen-volume-fill"
            );

        const dot =
            document.querySelector(
                "#fullscreenVolumeBar .fullscreen-volume-dot"
            );

        if (fill) {
            fill.style.setProperty(
                "--echo-volume",
                position
            );

            fill.style.setProperty(
                "width",
                position,
                "important"
            );
        }

        if (dot) {
            dot.style.setProperty(
                "--echo-volume",
                position
            );

            dot.style.setProperty(
                "left",
                position,
                "important"
            );
        }
    }

    function setFullscreenFixedTimeLabels() {
        if (
            !currentEpisode ||
            fullscreenTimeLabels.length < 2
        ) {
            return;
        }

        fullscreenTimeLabels[0].textContent =
            formatTime(
                currentEpisode.displayStartTime ??
                currentEpisode.startTime ??
                0
            );

        fullscreenTimeLabels[1].textContent =
            currentEpisode.displayDuration ||
            formatTime(
                currentEpisode.duration
            );
    }

    function updateFullscreenProgress() {
        if (
            !currentEpisode ||
            !currentEpisode.duration
        ) {
            return;
        }

        const percent =
            Math.max(
                0,
                Math.min(
                    100,
                    (
                        currentTime /
                        currentEpisode.duration
                    ) *
                        100
                )
            );

        if (fullscreenProgressFill) {
            fullscreenProgressFill.style.width =
                percent + "%";
        }

        if (fullscreenProgressDot) {
            fullscreenProgressDot.style.left =
                percent + "%";
        }
    }


    function setPlayerContentState(showContent) {
        if (!musicPlayer) {
            return;
        }

        const info =
            musicPlayer.querySelector(
                ".player-info"
            );

        const controls =
            musicPlayer.querySelector(
                ".player-controls"
            );

        const volumeControl =
            musicPlayer.querySelector(
                ".player-volume"
            );

        const expandButton =
            musicPlayer.querySelector(
                "#fullscreenButton"
            );

        if (showContent) {
            musicPlayer.classList.remove(
                "empty"
            );

            musicPlayer.classList.add(
                "show"
            );

            musicPlayer.hidden = false;
            musicPlayer.removeAttribute(
                "hidden"
            );
            musicPlayer.style.setProperty(
                "display",
                "flex",
                "important"
            );
            musicPlayer.style.setProperty(
                "visibility",
                "visible",
                "important"
            );
            musicPlayer.style.setProperty(
                "opacity",
                "1",
                "important"
            );

            if (info) {
                info.hidden = false;
                info.removeAttribute("hidden");
                info.style.setProperty(
                    "display",
                    "flex",
                    "important"
                );
                info.style.setProperty(
                    "visibility",
                    "visible",
                    "important"
                );
                info.style.setProperty(
                    "opacity",
                    "1",
                    "important"
                );
            }

            if (controls) {
                controls.hidden = false;
                controls.removeAttribute("hidden");
                controls.style.setProperty(
                    "display",
                    "flex",
                    "important"
                );
                controls.style.setProperty(
                    "visibility",
                    "visible",
                    "important"
                );
                controls.style.setProperty(
                    "opacity",
                    "1",
                    "important"
                );
            }

            if (volumeControl) {
                volumeControl.hidden = false;
                volumeControl.removeAttribute("hidden");
                volumeControl.style.setProperty(
                    "display",
                    "flex",
                    "important"
                );
                volumeControl.style.setProperty(
                    "visibility",
                    "visible",
                    "important"
                );
                volumeControl.style.setProperty(
                    "opacity",
                    "1",
                    "important"
                );
            }

            if (expandButton) {
                expandButton.hidden = false;
                expandButton.removeAttribute("hidden");
                expandButton.style.setProperty(
                    "display",
                    "flex",
                    "important"
                );
                expandButton.style.setProperty(
                    "visibility",
                    "visible",
                    "important"
                );
                expandButton.style.setProperty(
                    "opacity",
                    "1",
                    "important"
                );
            }
        } else {
            musicPlayer.classList.add(
                "empty"
            );

            musicPlayer.classList.remove(
                "show"
            );

            musicPlayer.hidden = false;
            musicPlayer.removeAttribute(
                "hidden"
            );
            musicPlayer.style.setProperty(
                "display",
                "flex",
                "important"
            );
            musicPlayer.style.removeProperty(
                "visibility"
            );
            musicPlayer.style.removeProperty(
                "opacity"
            );

            if (info) {
                info.style.setProperty(
                    "display",
                    "none",
                    "important"
                );
            }

            if (controls) {
                controls.style.setProperty(
                    "display",
                    "none",
                    "important"
                );
            }

            if (volumeControl) {
                volumeControl.style.setProperty(
                    "display",
                    "none",
                    "important"
                );
            }

            if (expandButton) {
                expandButton.style.setProperty(
                    "display",
                    "none",
                    "important"
                );
            }
        }
    }

    function updatePlayerDisplay() {
        if (!currentEpisode) {
            return;
        }

        if (playerImage) {
            playerImage.src =
                currentEpisode.image;

            playerImage.alt =
                currentEpisode.show;
        }

        if (playerTitle) {
            playerTitle.textContent =
                currentEpisode.title;
        }

        if (playerShow) {
            playerShow.textContent =
                currentEpisode.show;
        }

        if (playerEmpty) {
            playerEmpty.style.setProperty(
                "display",
                "none",
                "important"
            );
        }

        setPlayerContentState(true);
        updatePlayIcon();
    }

    function updateFullscreenDisplay() {
        if (!currentEpisode) {
            return;
        }

        if (fullscreenImage) {
            fullscreenImage.src =
                currentEpisode.image;

            fullscreenImage.alt =
                currentEpisode.show;
        }

        if (fullscreenTitle) {
            fullscreenTitle.textContent =
                currentEpisode.title;
        }

        if (fullscreenShow) {
            fullscreenShow.textContent =
                currentEpisode.show;
        }

        setFullscreenFixedTimeLabels();
        updateFullscreenProgress();
        updatePlayIcon();
        updateSpeedLabel();
        updateNormalVolume();
    }


    function clearPlaybackTimer() {
        if (playbackTimer) {
            window.clearInterval(
                playbackTimer
            );
        }

        playbackTimer = null;
    }

    function savePlayerState() {
        if (!currentEpisode) {
            return;
        }

        localStorage.setItem(
            "echoPlayerState",
            JSON.stringify({
                showId:
                    currentEpisode.showId,

                title:
                    currentEpisode.title,

                show:
                    currentEpisode.show,

                author:
                    currentEpisode.author,

                image:
                    currentEpisode.image,

                duration:
                    currentEpisode.duration,

                currentTime,
                isPlaying
            })
        );
    }

    function startPlayback() {
        clearPlaybackTimer();

        if (
            !currentEpisode ||
            currentEpisode.duration <= 0
        ) {
            return;
        }

        isPlaying = true;

        updatePlayerDisplay();
        updatePlayIcon();
        updateContinueIndicator();

        playbackTimer =
            window.setInterval(
                function () {
                    if (
                        !currentEpisode ||
                        !isPlaying
                    ) {
                        return;
                    }

                    currentTime +=
                        playbackSpeed;

                    if (
                        currentTime >=
                        currentEpisode.duration
                    ) {
                        currentTime =
                            currentEpisode.duration;

                        isPlaying = false;

                        clearPlaybackTimer();
                    }

                    updateFullscreenProgress();
                    updatePlayIcon();
                    updateContinueIndicator();
                    savePlayerState();
                },
                1000
            );
    }

    function pausePlayback() {
        isPlaying = false;

        clearPlaybackTimer();

        updatePlayIcon();
        updateContinueIndicator();
        savePlayerState();
    }

    function togglePlayback() {
        if (!currentEpisode) {
            return;
        }

        if (isPlaying) {
            pausePlayback();
        } else {
            startPlayback();
        }
    }

    function playVisualEpisode(episode) {
        if (!episode) {
            return false;
        }

        clearPlaybackTimer();

        currentEpisode = episode;
        currentShowId = episode.showId || "";
        currentTime =
            Number(episode.startTime) ||
            0;
        isPlaying = false;

        updatePlayerDisplay();
        updateFullscreenDisplay();
        updateContinueIndicator();

        startPlayback();
        savePlayerState();

        return true;
    }

    function openEpisodePlayer(element) {
        const card =
            element?.closest(
                ".episode-card, " +
                ".episode, " +
                ".saved-episode-card, " +
                ".history-episode-card, " +
                ".library-card"
            ) || element;

        const episode =
            createEpisodeFromElement(card);

        if (!episode) {
            return;
        }

        document
            .querySelectorAll(
                ".show-details .episode-card.echo-selected-episode"
            )
            .forEach(function (item) {
                item.classList.remove(
                    "echo-selected-episode"
                );
            });

        if (
            card &&
            card.matches?.(
                ".show-details .episode-card"
            )
        ) {
            card.classList.add(
                "echo-selected-episode"
            );
        }

        playVisualEpisode(episode);
    }

    window.openEpisodePlayer =
        openEpisodePlayer;


    function ensureUniversalPlayingIndicator(
        card
    ) {
        if (!card) {
            return;
        }

        if (
            card.querySelector(
                ":scope > .echo-universal-playing-indicator"
            )
        ) {
            return;
        }

        const indicator =
            document.createElement("span");

        indicator.className =
            "playing-indicator " +
            "echo-universal-playing-indicator";

        indicator.setAttribute(
            "aria-hidden",
            "true"
        );

        const bar1 =
            document.createElement("span");

        const bar2 =
            document.createElement("span");

        const bar3 =
            document.createElement("span");

        indicator.appendChild(bar1);
        indicator.appendChild(bar2);
        indicator.appendChild(bar3);

        card.appendChild(indicator);
    }

    function ensureUniversalPlayingIndicators() {
        const selector = [
            ".continue-section .episode",
            ".continue-listening .episode",
            ".continue-listening-section .episode",
            ".show-details .episode-card"
        ].join(", ");

        document
            .querySelectorAll(selector)
            .forEach(function (card) {
                ensureUniversalPlayingIndicator(
                    card
                );
            });
    }

    function isSamePlayingEpisode(card) {
        if (
            !card ||
            !currentEpisode
        ) {
            return false;
        }

        const showId =
            getShowIdFromElement(card);

        if (
            !showId ||
            showId !==
                currentEpisode.showId
        ) {
            return false;
        }

        const title =
            normalize(
                getEpisodeTitle(card)
            );

        if (
            card.classList.contains(
                "library-card"
            ) ||
            card.classList.contains(
                "podcast-card"
            ) ||
            card.classList.contains(
                "chart-card"
            )
        ) {
            return true;
        }

        return (
            title ===
            normalize(
                currentEpisode.title
            )
        );
    }

    function updateContinueIndicator() {
        ensureUniversalPlayingIndicators();

        const selector = [
            ".continue-section .episode",
            ".continue-listening .episode",
            ".continue-listening-section .episode",
            ".show-details .episode-card"
        ].join(", ");

        document
            .querySelectorAll(selector)
            .forEach(function (item) {
                item.classList.remove(
                    "currently-playing",
                    "echo-current-show-playing"
                );
            });

        if (
            !currentEpisode ||
            !isPlaying
        ) {
            return;
        }

        document
            .querySelectorAll(selector)
            .forEach(function (item) {
                if (
                    isSamePlayingEpisode(
                        item
                    )
                ) {
                    item.classList.add(
                        "currently-playing"
                    );

                    if (
                        item.classList.contains(
                            "library-card"
                        ) ||
                        item.classList.contains(
                            "podcast-card"
                        ) ||
                        item.classList.contains(
                            "chart-card"
                        )
                    ) {
                        item.classList.add(
                            "echo-current-show-playing"
                        );
                    }
                }
            });
    }

    function syncFinalPlayingIndicators() {
        document
            .querySelectorAll(
                ".podcast-card .echo-universal-playing-indicator, " +
                ".chart-card .echo-universal-playing-indicator, " +
                ".library-card .echo-universal-playing-indicator, " +
                ".saved-episode-card .echo-universal-playing-indicator, " +
                ".history-episode-card .echo-universal-playing-indicator"
            )
            .forEach(function (indicator) {
                indicator.remove();
            });

        document
            .querySelectorAll(
                ".continue-section .episode, " +
                ".continue-listening .episode, " +
                ".continue-listening-section .episode, " +
                ".show-details .episode-card"
            )
            .forEach(function (card) {
                if (
                    card ===
                        currentEpisode?.element &&
                    isPlaying
                ) {
                    card.classList.add(
                        "currently-playing"
                    );

                    ensureUniversalPlayingIndicator(
                        card
                    );
                } else {
                    card.classList.remove(
                        "currently-playing"
                    );

                    const indicator =
                        card.querySelector(
                            ":scope > .echo-universal-playing-indicator"
                        );

                    if (indicator) {
                        indicator.remove();
                    }
                }
            });
    }


    function populateShowPage(showId) {
        if (
            !showPageSection ||
            !SHOWS[showId]
        ) {
            return;
        }

        const show =
            SHOWS[showId];

        currentShowId =
            showId;

        showPageSection.dataset.showId =
            showId;

        if (showCover) {
            showCover.src =
                show.image;

            showCover.alt =
                show.title;
        }

        if (showCategory) {
            showCategory.textContent =
                show.category;
        }

        if (showTitle) {
            showTitle.textContent =
                show.title;
        }

        if (showAuthor) {
            showAuthor.textContent =
                show.author;
        }

        if (showSubscribers) {
            showSubscribers.textContent =
                show.subscribers;

            const subscriberItem =
                showSubscribers.closest(
                    ".show-meta-item"
                );

            if (subscriberItem) {
                subscriberItem.style.display =
                    show.subscribers
                        ? "inline-flex"
                        : "none";
            }
        }

        if (showEpisodeCount) {
            showEpisodeCount.textContent =
                show.episodeCount;

            const episodeCountItem =
                showEpisodeCount.closest(
                    ".show-meta-item"
                );

            if (episodeCountItem) {
                episodeCountItem.style.display =
                    show.episodeCount
                        ? "inline-flex"
                        : "none";
            }
        }

        if (showDescription) {
            showDescription.textContent =
                show.description;
        }

        if (hostName) {
            hostName.textContent =
                show.author;
        }

        if (hostRole) {
            hostRole.textContent =
                "Creator & Host";
        }

        const episodeRows =
            showPageSection.querySelectorAll(
                ".episodes-list .episode-card"
            );

        show.episodes.forEach(
            function (episode, index) {
                const row =
                    episodeRows[index];

                if (!row) {
                    return;
                }

                row.hidden = false;

                row.dataset.showId =
                    showId;

                row.dataset.duration =
                    String(
                        episode.duration
                    );

                row.dataset.startTime =
                    String(
                        episode.startTime
                    );

                row.dataset.episodeIndex =
                    String(index);

                const number =
                    row.querySelector(
                        ".episode-number"
                    );

                const heading =
                    row.querySelector(
                        "h3"
                    );

                const description =
                    row.querySelector(
                        "p"
                    );

                if (number) {
                    number.textContent =
                        episode.number;
                }

                if (heading) {
                    heading.textContent =
                        episode.title;
                }

                if (description) {
                    description.textContent =
                        episode.show;
                }

                const meta =
                    row.querySelector(
                        ".episode-content > span"
                    );

                if (meta) {
                    const dateElement =
                        meta.querySelector(
                            ".episode-date"
                        );

                    const strong =
                        meta.querySelector(
                            "strong"
                        );

                    if (dateElement) {
                        dateElement.textContent =
                            episode.date;
                    }

                    if (strong) {
                        strong.textContent =
                            episode.displayDuration;
                    }
                }
            }
        );

        for (
            let index =
                show.episodes.length;
            index < episodeRows.length;
            index += 1
        ) {
            episodeRows[index].hidden =
                true;
        }

        const noEpisodes =
            document.getElementById(
                "noEpisodes"
            );

        if (noEpisodes) {
            noEpisodes.hidden =
                show.hasEpisodes;
        }

        if (showEpisodesList) {
            showEpisodesList.style.display =
                show.hasEpisodes
                    ? "flex"
                    : "block";
        }

        if (showAboutSection) {
            showAboutSection.style.display =
                "none";
        }

        if (showEpisodesTab) {
            showEpisodesTab.classList.add(
                "active"
            );
        }

        if (showAboutTab) {
            showAboutTab.classList.remove(
                "active"
            );
        }

        document.title =
            "Echo - " + show.title;
    }

    function prepareShowSection(section) {
    if (!section || !SHOWS[section.id]) return;

    const show = SHOWS[section.id];

    const category = section.querySelector(".show-category");
    const author = section.querySelector(".show-author");
    const host = section.querySelector(".host-info strong");
    const role = section.querySelector(".host-info span");

    if (category) category.textContent = show.category;
    if (author) author.textContent = show.author;
    if (host) host.textContent = show.author;
    if (role) role.textContent = "Creator & Host";

    section.querySelectorAll(".episodes-list .episode-card").forEach(function (card, index) {

        card.dataset.showId = section.id;

        const episode = show.episodes?.[index];
        const meta = card.querySelector(".episode-content > span");

        if (episode && meta) {

            let dateElement = meta.querySelector(".episode-date");
            let clockElement = meta.querySelector(".episode-clock");
            let durationElement = meta.querySelector(".episode-duration");

            if (!dateElement) {
                dateElement = document.createElement("span");
                dateElement.className = "episode-date";
            }

            if (!clockElement) {
                clockElement = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "svg"
                );

                clockElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                clockElement.setAttribute("width", "16");
                clockElement.setAttribute("height", "16");
                clockElement.setAttribute("viewBox", "0 0 16 16");
                clockElement.setAttribute("fill", "currentColor");
                clockElement.setAttribute("aria-hidden", "true");
                clockElement.classList.add("bi", "bi-clock", "episode-clock");

                const path1 = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );
                path1.setAttribute(
                    "d",
                    "M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"
                );

                const path2 = document.createElementNS(
                    "http://www.w3.org/2000/svg",
                    "path"
                );
                path2.setAttribute(
                    "d",
                    "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"
                );

                clockElement.appendChild(path1);
                clockElement.appendChild(path2);
            }

            if (!durationElement) {
                durationElement = document.createElement("span");
                durationElement.className = "episode-duration";
            }

            dateElement.textContent = episode.date;
            durationElement.textContent = episode.displayDuration;

            /* Force the SVG to remain visible even with existing CSS rules. */
            clockElement.style.setProperty("display", "inline-block", "important");
            clockElement.style.setProperty("visibility", "visible", "important");
            clockElement.style.setProperty("opacity", "1", "important");
            clockElement.style.setProperty("width", "16px", "important");
            clockElement.style.setProperty("height", "16px", "important");
            clockElement.style.setProperty("margin", "0 6px", "important");
            clockElement.style.setProperty("vertical-align", "middle", "important");
            clockElement.style.setProperty("color", "currentColor", "important");
            clockElement.style.setProperty("fill", "currentColor", "important");

            meta.replaceChildren(
                dateElement,
                clockElement,
                durationElement
            );
        }

        if (index === 0 && show.duration > 0) {
            card.dataset.duration = String(show.duration);
            card.dataset.startTime = String(show.startTime);
        }
    });

    section.classList.toggle("echo-no-episodes", !show.hasEpisodes);
}
    function ensureShowActionButtons() {
        document
            .querySelectorAll(
                ".show-details .show-actions"
            )
            .forEach(function (actions) {
                let latest =
                    actions.querySelector(
                        ":scope > .latest-episode-button"
                    );

                let subscribe =
                    actions.querySelector(
                        ":scope > .subscribe-button"
                    );

                let share =
                    actions.querySelector(
                        ":scope > .share-button"
                    );

                if (!latest) {
                    latest =
                        document.createElement(
                            "button"
                        );

                    latest.type =
                        "button";

                    latest.className =
                        "latest-episode-button";

                    latest.textContent =
                        "Latest Episode";
                }

                if (!subscribe) {
                    subscribe =
                        document.createElement(
                            "button"
                        );

                    subscribe.type =
                        "button";

                    subscribe.className =
                        "subscribe-button favorite-button";
                }

                subscribe.classList.add(
                    "favorite-button"
                );

               
                actions
                    .querySelectorAll(
                        ":scope > .latest-episode-button"
                    )
                    .forEach(
                        function (
                            button,
                            index
                        ) {
                            if (
                                button !==
                                    latest ||
                                index > 0
                            ) {
                                button.remove();
                            }
                        }
                    );

                actions
                    .querySelectorAll(
                        ":scope > .subscribe-button"
                    )
                    .forEach(
                        function (
                            button,
                            index
                        ) {
                            if (
                                button !==
                                    subscribe ||
                                index > 0
                            ) {
                                button.remove();
                            }
                        }
                    );

                actions
                    .querySelectorAll(
                        ":scope > .favorite-button:not(.subscribe-button)"
                    )
                    .forEach(
                        function (button) {
                            button.remove();
                        }
                    );

                actions
                    .querySelectorAll(
                        ":scope > .share-button"
                    )
                    .forEach(
                        function (
                            button,
                            index
                        ) {
                            if (
                                button !==
                                    share ||
                                index > 0
                            ) {
                                button.remove();
                            }
                        }
                    );

             
                const wasSubscribed =
                    subscribe.classList.contains(
                        "subscribed"
                    );

                const wasLiked =
                    subscribe.classList.contains(
                        "liked"
                    );

                subscribe.innerHTML = "";

                const heart =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "svg"
                    );

                heart.setAttribute(
                    "viewBox",
                    "0 0 16 16"
                );

                heart.setAttribute(
                    "width",
                    "17"
                );

                heart.setAttribute(
                    "height",
                    "17"
                );

                heart.setAttribute(
                    "fill",
                    "none"
                );

                heart.setAttribute(
                    "stroke",
                    "#8b5cf6"
                );

                heart.setAttribute(
                    "stroke-width",
                    "1.8"
                );

                heart.setAttribute(
                    "stroke-linecap",
                    "round"
                );

                heart.setAttribute(
                    "stroke-linejoin",
                    "round"
                );

                heart.setAttribute(
                    "aria-hidden",
                    "true"
                );

                heart.classList.add(
                    "echo-subscribe-heart-svg"
                );

                const heartPath =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                    );

                heartPath.setAttribute(
                    "d",
                    "M8 14s6-3.5 6-8.03C14 3.78 12.66 2 10.8 2 9.72 2 8.76 2.6 8 3.55 7.24 2.6 6.28 2 5.2 2 3.34 2 2 3.78 2 5.97 2 10.5 8 14 8 14Z"
                );

                heartPath.setAttribute(
                    "fill",
                    "none"
                );

                heartPath.setAttribute(
                    "stroke",
                    "currentColor"
                );

                heart.appendChild(
                    heartPath
                );

                const label =
                    document.createElement(
                        "span"
                    );

                label.className =
                    "echo-subscribe-text";

                label.textContent =
                    "Subscribe";

                subscribe.appendChild(
                    heart
                );

                subscribe.appendChild(
                    label
                );

                subscribe.classList.toggle(
                    "subscribed",
                    wasSubscribed
                );

                subscribe.classList.toggle(
                    "liked",
                    wasLiked
                );

                /*
                 * Build Share button if missing.
                 */
                if (!share) {
                    share =
                        document.createElement(
                            "button"
                        );

                    share.type =
                        "button";

                    share.className =
                        "share-button";

                    share.setAttribute(
                        "aria-label",
                        "Share"
                    );

                    const shareSvg =
                        document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "svg"
                        );

                    shareSvg.setAttribute(
                        "viewBox",
                        "0 0 16 16"
                    );

                    shareSvg.setAttribute(
                        "fill",
                        "currentColor"
                    );

                    shareSvg.setAttribute(
                        "width",
                        "16"
                    );

                    shareSvg.setAttribute(
                        "height",
                        "16"
                    );

                    shareSvg.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                    const sharePath =
                        document.createElementNS(
                            "http://www.w3.org/2000/svg",
                            "path"
                        );

                    sharePath.setAttribute(
                        "d",
                        "M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"
                    );

                    shareSvg.appendChild(
                        sharePath
                    );

                    share.appendChild(
                        shareSvg
                    );
                }

                actions.appendChild(
                    latest
                );

                actions.appendChild(
                    subscribe
                );

                actions.appendChild(
                    share
                );
            });
    }

    function formatTopChartSubscriber(
        value
    ) {
        let text =
            String(
                value || ""
            ).trim();

        text =
            text.replace(
                /\bsubscribers?\b/gi,
                ""
            ).trim();

        text =
            text.replace(
                /\s+million\b/gi,
                "M"
            );

        text =
            text.replace(
                /\s+billion\b/gi,
                "B"
            );

        text =
            text.replace(
                /\s+thousand\b/gi,
                "K"
            );

        return text.replace(
            /\s+/g,
            ""
        );
    }

    function formatTopChartEpisodes(
        value
    ) {
        const text =
            String(
                value || ""
            ).trim();

        const match =
            text.match(
                /[\d,.]+(?:\s*[KMB])?/i
            );

        return match
            ? match[0].replace(
                  /\s+/g,
                  ""
              ) + " eps"
            : "";
    }

    function normalizeTopCharts() {
        if (!isExplorePage) {
            return;
        }

        document
            .querySelectorAll(
                ".chart-grid .chart-card, " +
                ".chart-list .chart-card"
            )
            .forEach(
                function (
                    card,
                    index
                ) {
                    const showId =
                        card.dataset.showId ||
                        getShowIdFromElement(
                            card
                        );

                    const show =
                        SHOWS[showId];

                    if (!show) {
                        return;
                    }

                    card.dataset.showId =
                        showId;

                    const rank =
                        card.querySelector(
                            ":scope > .chart-number, " +
                            ":scope > .chart-rank"
                        );

                    const image =
                        card.querySelector(
                            ":scope > img"
                        );

                    const info =
                        card.querySelector(
                            ":scope > .chart-info"
                        );

                    const stats =
                        card.querySelector(
                            ":scope > .chart-stats"
                        );

                    if (rank) {
                        const currentRank =
                            rank.textContent.trim();

                        rank.textContent =
                            currentRank ||
                            String(
                                index + 1
                            );
                    }

                    if (image) {
                        if (
                            !image.getAttribute(
                                "src"
                            )
                        ) {
                            image.src =
                                show.image;
                        }

                        if (
                            !image.getAttribute(
                                "alt"
                            )
                        ) {
                            image.alt =
                                show.title;
                        }
                    }

                    if (info) {
                        const heading =
                            info.querySelector(
                                "strong, h3"
                            );

                        const paragraph =
                            info.querySelector(
                                "small, p"
                            );

                        if (heading) {
                            heading.textContent =
                                show.title;
                        }

                        if (paragraph) {
                            paragraph.textContent =
                                show.author;
                        }
                    }

                    if (stats) {
                        const subscriberText =
                            stats.querySelector(
                                ":scope > strong"
                            );

                        const episodeText =
                            stats.querySelector(
                                ":scope > span"
                            );

                        if (
                            subscriberText
                        ) {
                            subscriberText.textContent =
                                formatTopChartSubscriber(
                                    show.subscribers
                                );
                        }

                        if (episodeText) {
                            episodeText.textContent =
                                formatTopChartEpisodes(
                                    show.episodeCount
                                );
                        }
                    }

                    card.querySelectorAll(
                        ":scope > .chart-episode"
                    ).forEach(
                        function (item) {
                            item.remove();
                        }
                    );
                }
            );
    }

    function ensureTopChartStats() {
        if (!isExplorePage) {
            return;
        }

        document
            .querySelectorAll(
                ".chart-grid .chart-card, " +
                ".chart-list .chart-card"
            )
            .forEach(function (card) {
                const showId =
                    card.dataset.showId ||
                    getShowIdFromElement(
                        card
                    );

                const show =
                    SHOWS[showId];

                if (!show) {
                    return;
                }

                let stats =
                    card.querySelector(
                        ":scope > .chart-stats"
                    );

                if (!stats) {
                    stats =
                        document.createElement(
                            "div"
                        );

                    stats.className =
                        "chart-stats";

                    card.appendChild(
                        stats
                    );
                }

                stats.style.setProperty(
                    "display",
                    "flex",
                    "important"
                );

                stats.style.setProperty(
                    "visibility",
                    "visible",
                    "important"
                );

                stats.style.setProperty(
                    "opacity",
                    "1",
                    "important"
                );

                let subscriberText =
                    stats.querySelector(
                        ":scope > strong"
                    );

                if (!subscriberText) {
                    subscriberText =
                        document.createElement(
                            "strong"
                        );

                    stats.appendChild(
                        subscriberText
                    );
                }

                let episodeText =
                    stats.querySelector(
                        ":scope > span"
                    );

                if (!episodeText) {
                    episodeText =
                        document.createElement(
                            "span"
                        );

                    stats.appendChild(
                        episodeText
                    );
                }

                subscriberText.textContent =
                    formatTopChartSubscriber(
                        show.subscribers
                    );

                episodeText.textContent =
                    formatTopChartEpisodes(
                        show.episodeCount
                    );

                [
                    subscriberText,
                    episodeText
                ].forEach(function (
                    element
                ) {
                    element.style.setProperty(
                        "display",
                        "block",
                        "important"
                    );

                    element.style.setProperty(
                        "visibility",
                        "visible",
                        "important"
                    );

                    element.style.setProperty(
                        "opacity",
                        "1",
                        "important"
                    );
                });
            });
    }


    function normalizeShowEpisodeNumbers() {
        document
            .querySelectorAll(
                ".show-details .episode-card .episode-number"
            )
            .forEach(
                function (
                    element,
                    index
                ) {
                    const parsed =
                        parseInt(
                            element.textContent.trim(),
                            10
                        );

                    element.textContent =
                        Number.isFinite(parsed)
                            ? String(parsed)
                            : String(
                                  index + 1
                              );
                }
            );
    }

    function getPageContainer() {
        if (isHomePage) {
            return document.querySelector(
                ".main-content"
            );
        }

        if (isExplorePage) {
            return document.querySelector(
                ".explore-main"
            );
        }

        if (isLibraryPage) {
            return document.querySelector(
                ".main-content"
            );
        }

        return null;
    }

    function showOnlySection(section) {
        if (!section) {
            return;
        }

        const container =
            getPageContainer();

        document
            .querySelectorAll(
                ".show-details"
            )
            .forEach(function (item) {
                item.classList.remove(
                    "active",
                    "echo-about-active",
                    "echo-episodes-active"
                );
            });

        document
            .querySelectorAll(
                ".echo-page-hidden"
            )
            .forEach(function (item) {
                item.classList.remove(
                    "echo-page-hidden"
                );
            });

        if (container) {
            Array.from(
                container.children
            ).forEach(function (child) {
                if (child !== section) {
                    child.classList.add(
                        "echo-page-hidden"
                    );
                }
            });
        }

        section.classList.add(
            "active"
        );

        prepareShowSection(
            section
        );

        document.body.classList.add(
            "echo-inline-show-page"
        );
    }

    function restoreNormalPageView(
        updateUrl = true
    ) {
        document.body.classList.remove(
            "echo-inline-show-page"
        );

        if (fullscreenPlayer) {
            fullscreenPlayer.classList.remove(
                "show"
            );
        }

        document.body.classList.remove(
            "music-file-extended-page"
        );

        document
            .querySelectorAll(
                ".show-details"
            )
            .forEach(function (section) {
                section.classList.remove(
                    "active",
                    "echo-about-active",
                    "echo-episodes-active"
                );
            });

        document
            .querySelectorAll(
                ".echo-page-hidden"
            )
            .forEach(function (item) {
                item.classList.remove(
                    "echo-page-hidden"
                );
            });

        if (isLibraryPage) {
            const grid =
                document.querySelector(
                    ".library-grid"
                );

            const saved =
                document.getElementById(
                    "saved-episodes-section"
                );

            const history =
                document.getElementById(
                    "history-section"
                );

            if (grid) {
                grid.style.display =
                    "grid";
            }

            if (saved) {
                saved.style.display =
                    "none";
            }

            if (history) {
                history.style.display =
                    "none";
            }
        }

        if (updateUrl) {
            const url =
                new URL(
                    window.location.href
                );

            url.search = "";

            window.history.replaceState(
                {},
                "",
                url.toString()
            );
        }

        document.title =
            isHomePage
                ? "Echo Podcast"
                : isExplorePage
                    ? "Echo - Explore"
                    : "Echo - Library";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function openShow(
        showId,
        source,
        updateHistory = true
    ) {
        if (!SHOWS[showId]) {
            return;
        }

        const section =
            document.getElementById(
                showId
            );

        if (
            !section ||
            !section.classList.contains(
                "show-details"
            )
        ) {
            console.error(
                "Echo: Extended Podcast section not found on this page:",
                showId
            );

            return;
        }

        showOnlySection(
            section
        );

        const from =
            source ||
            (
                isHomePage
                    ? "home"
                    : isExplorePage
                        ? "explore"
                        : "library"
            );

        const url =
            new URL(
                window.location.href
            );

        url.search = "";

        url.searchParams.set(
            "show",
            showId
        );

        url.searchParams.set(
            "source",
            from
        );

        if (updateHistory) {
            window.history.pushState(
                {},
                "",
                url.toString()
            );
        } else {
            window.history.replaceState(
                {},
                "",
                url.toString()
            );
        }

        document.title =
            "Echo - " +
            SHOWS[showId].title;

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    window.openShow =
        openShow;

    function backToLibrary() {
        restoreNormalPageView(
            true
        );
    }

    window.backToLibrary =
        backToLibrary;

    function showEpisodes(button) {
        const section =
            button?.closest(
                ".show-details"
            );

        if (!section) {
            return;
        }

        section.classList.remove(
            "echo-about-active"
        );

        section.classList.add(
            "echo-episodes-active"
        );

        section
            .querySelectorAll(
                ".show-tab"
            )
            .forEach(function (tab) {
                tab.classList.remove(
                    "active"
                );
            });

        button.classList.add(
            "active"
        );

        const episodes =
            section.querySelector(
                ".episodes-list"
            );

        const about =
            section.querySelector(
                ".show-about"
            );

        if (episodes) {
            episodes.style.display =
                "flex";
        }

        if (about) {
            about.style.display =
                "none";
        }
    }

    function showAbout(button) {
        const section =
            button?.closest(
                ".show-details"
            );

        if (!section) {
            return;
        }

        section.classList.remove(
            "echo-episodes-active"
        );

        section.classList.add(
            "echo-about-active"
        );

        section
            .querySelectorAll(
                ".show-tab"
            )
            .forEach(function (tab) {
                tab.classList.remove(
                    "active"
                );
            });

        button.classList.add(
            "active"
        );

        const episodes =
            section.querySelector(
                ".episodes-list"
            );

        const about =
            section.querySelector(
                ".show-about"
            );

        if (episodes) {
            episodes.style.display =
                "none";
        }

        if (about) {
            about.style.display =
                "block";
        }
    }

    window.showEpisodes =
        showEpisodes;

    window.showAbout =
        showAbout;

    function activateLibraryTab(
        button
    ) {
        if (!button) {
            return;
        }

        const selectedTab =
            button.dataset.tab ||
            "";

        const tabs =
            document.querySelectorAll(
                ".library-tab"
            );

        const grid =
            document.querySelector(
                ".library-grid"
            );

        const saved =
            document.getElementById(
                "saved-episodes-section"
            );

        const history =
            document.getElementById(
                "history-section"
            );

        tabs.forEach(function (tab) {
            tab.classList.remove(
                "active"
            );
        });

        button.classList.add(
            "active"
        );

        if (grid) {
            grid.classList.add(
                "echo-page-hidden"
            );

            grid.style.display =
                "none";
        }

        if (saved) {
            saved.classList.add(
                "echo-page-hidden"
            );

            saved.style.display =
                "none";
        }

        if (history) {
            history.classList.add(
                "echo-page-hidden"
            );

            history.style.display =
                "none";
        }

        if (
            selectedTab ===
            "subscribed"
        ) {
            if (grid) {
                grid.classList.remove(
                    "echo-page-hidden"
                );

                grid.style.display =
                    "grid";
            }
        } else if (
            selectedTab ===
            "saved"
        ) {
            if (saved) {
                saved.classList.remove(
                    "echo-page-hidden"
                );

                saved.style.display =
                    "block";
            }
        } else if (
            selectedTab ===
            "history"
        ) {
            if (history) {
                history.classList.remove(
                    "echo-page-hidden"
                );

                history.style.display =
                    "block";
            }
        }
    }

    function openExtendedPlayer() {
        if (
            !currentEpisode ||
            !fullscreenPlayer
        ) {
            return;
        }

        updatePlayerDisplay();

        fullscreenPlayer.classList.add(
            "show"
        );

        document.body.classList.add(
            "music-file-extended-page"
        );

        updateFullscreenDisplay();
    }

    function closeExtendedPlayer() {
        if (fullscreenPlayer) {
            fullscreenPlayer.classList.remove(
                "show"
            );
        }

        document.body.classList.remove(
            "music-file-extended-page"
        );

        savePlayerState();
    }


    function bindProgressBar() {
        if (
            !fullscreenProgress ||
            fullscreenProgress.dataset.echoBound ===
                "true"
        ) {
            return;
        }

        fullscreenProgress.dataset.echoBound =
            "true";

        let dragging = false;

        function setProgress(event) {
            if (
                !currentEpisode ||
                currentEpisode.duration <= 0
            ) {
                return;
            }

            const rect =
                fullscreenProgress.getBoundingClientRect();

            if (!rect.width) {
                return;
            }

            const percent =
                Math.max(
                    0,
                    Math.min(
                        1,
                        (
                            event.clientX -
                            rect.left
                        ) /
                            rect.width
                    )
                );

            currentTime =
                currentEpisode.duration *
                percent;

            updateFullscreenProgress();
            savePlayerState();
        }

        fullscreenProgress.addEventListener(
            "pointerdown",
            function (event) {
                dragging = true;

                fullscreenProgress.setPointerCapture?.(
                    event.pointerId
                );

                setProgress(event);

                event.preventDefault();
            }
        );

        fullscreenProgress.addEventListener(
            "pointermove",
            function (event) {
                if (!dragging) {
                    return;
                }

                setProgress(event);
                event.preventDefault();
            }
        );

        fullscreenProgress.addEventListener(
            "pointerup",
            function () {
                dragging = false;
            }
        );

        fullscreenProgress.addEventListener(
            "pointercancel",
            function () {
                dragging = false;
            }
        );
    }


    function bindNormalVolumeDrag() {
        const bar =
            document.getElementById(
                "volumeBar"
            ) ||
            normalVolumeBar;

        if (
            !bar ||
            bar.dataset.echoVolumeBound ===
                "true"
        ) {
            return;
        }

        bar.dataset.echoVolumeBound =
            "true";

        let dragging = false;

        function setVolumeFromEvent(
            event
        ) {
            const rect =
                bar.getBoundingClientRect();

            if (!rect.width) {
                return;
            }

            const next =
                Math.max(
                    0,
                    Math.min(
                        1,
                        (
                            event.clientX -
                            rect.left
                        ) /
                            rect.width
                    )
                );

            volume = next;

            localStorage.setItem(
                "echoVolumeLevel",
                String(volume)
            );

            updateNormalVolume();

            event.preventDefault();
        }

        bar.addEventListener(
            "pointerdown",
            function (event) {
                dragging = true;

                bar.setPointerCapture?.(
                    event.pointerId
                );

                setVolumeFromEvent(
                    event
                );
            },
            {
                passive: false
            }
        );

        bar.addEventListener(
            "pointermove",
            function (event) {
                if (!dragging) {
                    return;
                }

                setVolumeFromEvent(
                    event
                );
            },
            {
                passive: false
            }
        );

        bar.addEventListener(
            "pointerup",
            function () {
                dragging = false;
            }
        );

        bar.addEventListener(
            "pointercancel",
            function () {
                dragging = false;
            }
        );
    }


    function bindFullscreenVolumeDrag() {
        const bar =
            document.getElementById(
                "fullscreenVolumeBar"
            );

        if (
            !bar ||
            bar.dataset.echoFinalVolumeBound ===
                "true"
        ) {
            return;
        }

        bar.dataset.echoFinalVolumeBound =
            "true";

        let dragging = false;

        function setVolumeFromEvent(
            event
        ) {
            const rect =
                bar.getBoundingClientRect();

            if (!rect.width) {
                return;
            }

            const next =
                Math.max(
                    0,
                    Math.min(
                        1,
                        (
                            event.clientX -
                            rect.left
                        ) /
                            rect.width
                    )
                );

            volume = next;

            localStorage.setItem(
                "echoVolumeLevel",
                String(volume)
            );

            updateNormalVolume();

            event.preventDefault();
        }

        const volumeIcon =
            bar.closest(
                ".fullscreen-volume"
            )?.querySelector(
                ".volume-icon"
            );

        if (
            volumeIcon &&
            volumeIcon.dataset.echoMuteBound !==
                "true"
        ) {
            volumeIcon.dataset.echoMuteBound =
                "true";

            volumeIcon.addEventListener(
                "click",
                function (event) {
                    event.preventDefault();
                    event.stopPropagation();

                    const isMuted =
                        volume <= 0;

                    if (isMuted) {
                        const restoreVolume =
                            Number(
                                localStorage.getItem(
                                    "echoVolumeBeforeMute"
                                )
                            );

                        volume =
                            Number.isFinite(
                                restoreVolume
                            ) &&
                            restoreVolume > 0
                                ? restoreVolume
                                : 0.7;
                    } else {
                        localStorage.setItem(
                            "echoVolumeBeforeMute",
                            String(volume)
                        );

                        volume = 0;
                    }

                    localStorage.setItem(
                        "echoVolumeLevel",
                        String(volume)
                    );

                    updateNormalVolume();
                }
            );
        }

        bar.addEventListener(
            "pointerdown",
            function (event) {
                dragging = true;

                bar.setPointerCapture?.(
                    event.pointerId
                );

                setVolumeFromEvent(
                    event
                );
            },
            {
                passive: false
            }
        );

        bar.addEventListener(
            "pointermove",
            function (event) {
                if (!dragging) {
                    return;
                }

                setVolumeFromEvent(
                    event
                );
            },
            {
                passive: false
            }
        );

        bar.addEventListener(
            "pointerup",
            function () {
                dragging = false;
            }
        );

        bar.addEventListener(
            "pointercancel",
            function () {
                dragging = false;
            }
        );
    }


    function getCurrentEpisodeCards() {
        const section =
            currentEpisode?.element?.closest(
                ".show-details"
            );

        if (section) {
            return Array.from(
                section.querySelectorAll(
                    ".episodes-list .episode-card"
                )
            );
        }

        return [];
    }

    function playPrevious() {
        const cards =
            getCurrentEpisodeCards();

        if (cards.length) {
            const currentIndex =
                cards.indexOf(
                    currentEpisode.element
                );

            const index =
                currentIndex > 0
                    ? currentIndex - 1
                    : cards.length - 1;

            openEpisodePlayer(
                cards[index]
            );

            return;
        }

        moveToShow(-1);
    }

    function playNext() {
        const cards =
            getCurrentEpisodeCards();

        if (cards.length) {
            const currentIndex =
                cards.indexOf(
                    currentEpisode.element
                );

            const index =
                currentIndex <
                cards.length - 1
                    ? currentIndex + 1
                    : 0;

            openEpisodePlayer(
                cards[index]
            );

            return;
        }

        moveToShow(1);
    }

    function moveToShow(
        direction
    ) {
        if (!currentEpisode) {
            return;
        }

        let index =
            SHOW_ORDER.indexOf(
                currentEpisode.showId
            );

        if (index < 0) {
            index = 0;
        }

        for (
            let i = 0;
            i < SHOW_ORDER.length;
            i += 1
        ) {
            index =
                (
                    index +
                    direction +
                    SHOW_ORDER.length
                ) %
                SHOW_ORDER.length;

            const showId =
                SHOW_ORDER[index];

            const episode =
                createEpisodeFromShow(
                    showId
                );

            if (episode) {
                playVisualEpisode(
                    episode
                );

                return;
            }
        }
    }

function ensureLibraryHistoryEpisodes() {
    if (!isLibraryPage) return;

    const list = document.querySelector("#history-section .history-list");
    if (!list) return;

    const desired = [
        {
            showId: "mystery-files",
            title: "The Disappearance of Flight 370"
        },
        {
            showId: "laugh-track",
            title: "Comedy Gold: Best of 2023"
        },
        {
            showId: "science-unlocked",
            title: "The James Webb Telescope: New Discoveries"
        },
        {
            showId: "morning-briefing",
            title: "Global Markets Update: January 2024"
        },
        {
            showId: "startup-stories",
            title: "From Garage to $10B: The Stripe Story"
        },
        {
            showId: "mindful-moments",
            title: "10-Minute Morning Meditation"
        }
    ];

    const template =
        list.querySelector(":scope > .history-episode-card") ||
        list.querySelector(":scope > .episode-card");

    if (!template) return;

    function cloneHistoryCard(item) {
        const show = SHOWS[item.showId];

        if (!show) return null;

        const episode = show.episodes?.[0];

        if (!episode) return null;

        const card = template.cloneNode(true);

        card.className = "episode-card history-episode-card";

        card.dataset.showId = item.showId;
        card.dataset.startTime = String(episode.startTime || 0);
        card.dataset.duration = String(episode.duration || 0);
        card.dataset.episodeIndex = "0";
        card.dataset.title = item.title;

        const image = card.querySelector(".saved-episode-image img");

        if (image) {
            image.src = show.image;
            image.alt = show.title;
        }

        const play = card.querySelector(".saved-episode-play");

        if (play) {
            play.setAttribute(
                "aria-label",
                "Play " + item.title
            );
        }

        const title = card.querySelector(".episode-content h3");

        if (title) {
            title.textContent = item.title;
        }

        const showName = card.querySelector(".episode-content p");

        if (showName) {
            showName.textContent = show.title;
        }

        const meta = card.querySelector(".saved-episode-meta");

        if (meta) {
            const spans = meta.querySelectorAll(":scope > span");

            if (spans[0]) {
                spans[0].textContent = episode.date;
            }

            if (spans[1]) {
                const svg = spans[1].querySelector("svg");

                while (spans[1].firstChild) {
                    spans[1].removeChild(spans[1].firstChild);
                }

                if (svg) {
                    spans[1].appendChild(svg);
                }

                spans[1].appendChild(
                    document.createTextNode(
                        " " + episode.displayDuration
                    )
                );
            }
        }

        card.querySelectorAll(
            ".saved-episode-progress-fill"
        ).forEach(function (fill) {
            fill.style.width = "0";
        });

        card.classList.remove(
            "currently-playing",
            "playing",
            "active"
        );

        return card;
    }

    const fragment = document.createDocumentFragment();

    desired.forEach(function (item) {
        const card = cloneHistoryCard(item);

        if (card) {
            fragment.appendChild(card);
        }
    });

    list.replaceChildren(fragment);

    ensureEpisodeHoverVideoButtons();
    ensureUniversalPlayingIndicators();
}



    function dedupeShowSections() {
        if (!isLibraryPage) {
            return;
        }

        const seen =
            new Set();

        document
            .querySelectorAll(
                ".show-details"
            )
            .forEach(function (section) {
                const id =
                    section.id;

                if (!id) {
                    return;
                }

                if (seen.has(id)) {
                    section.remove();
                    return;
                }

                seen.add(id);
            });
    }

    function normalizeSettingsUi() {
        if (!isSettingsPage) {
            return;
        }

        document
            .querySelectorAll(
                ".settings-section"
            )
            .forEach(function (section) {
                const heading =
                    normalize(
                        section.querySelector(
                            "h2"
                        )?.textContent
                    );

                if (
                    heading !==
                    "privacy & support"
                ) {
                    return;
                }

                const rows =
                    section.querySelectorAll(
                        ".settings-card .settings-row"
                    );

                const signOut =
                    Array.from(
                        rows
                    ).find(function (row) {
                        return normalize(
                            row.textContent
                        ).includes(
                            "sign out"
                        );
                    }) ||
                    rows[rows.length - 1];

                if (signOut) {
                    signOut.classList.add(
                        "echo-signout-row"
                    );
                }
            });

        const footer =
            document.querySelector(
                ".settings-footer > span, " +
                ".settings-footer .version, " +
                ".settings-footer-version, " +
                ".settings-footer > .version, " +
                ".version"
            );

        if (footer) {
            while (
                footer.firstChild
            ) {
                footer.removeChild(
                    footer.firstChild
                );
            }

            footer.appendChild(
                document.createTextNode(
                    "Echo v1.0.0 "
                )
            );

            const dot =
                document.createElement(
                    "span"
                );

            dot.className =
                "echo-footer-dot";

            dot.textContent =
                "•";

            footer.appendChild(dot);

            footer.appendChild(
                document.createTextNode(
                    " Made with "
                )
            );

            const heart =
                document.createElement(
                    "span"
                );

            heart.className =
                "settings-heart";

            heart.textContent =
                "♥";

            footer.appendChild(
                heart
            );
        }

        document
            .querySelectorAll(
                ".settings-section .settings-row, " +
                ".settings-section .settings-item"
            )
            .forEach(function (row) {
                const rowText =
                    normalize(
                        row.textContent
                    );

                if (
                    rowText.includes(
                        "audio quality"
                    )
                ) {
                    row.classList.add(
                        "echo-settings-audio-quality"
                    );
                }

                if (
                    rowText.includes(
                        "help & support"
                    ) ||
                    rowText.includes(
                        "help support"
                    )
                ) {
                    row.classList.add(
                        "echo-settings-help-support"
                    );
                }

                if (
                    rowText.includes(
                        "sign out"
                    )
                ) {
                    row.classList.add(
                        "echo-signout-row"
                    );
                }
            });
    }

    function setupSettingsFunctionality() {
        if (!isSettingsPage) {
            return;
        }

        const autoplay =
            document.getElementById(
                "autoplayToggle"
            );

        const notifications =
            document.getElementById(
                "notificationToggle"
            );

        const email =
            document.getElementById(
                "emailToggle"
            );

        const history =
            document.getElementById(
                "historyToggle"
            );

        const speedSelect =
            document.getElementById(
                "speedSelect"
            );

        function restoreToggle(
            element,
            key,
            fallback
        ) {
            if (!element) {
                return;
            }

            const saved =
                localStorage.getItem(
                    key
                );

            element.checked =
                saved === null
                    ? fallback
                    : saved === "true";
        }

        function saveToggle(
            element,
            key
        ) {
            if (element) {
                localStorage.setItem(
                    key,
                    String(
                        element.checked
                    )
                );
            }
        }

        restoreToggle(
            autoplay,
            "echoAutoplay",
            true
        );

        restoreToggle(
            notifications,
            "echoNotifications",
            true
        );

        restoreToggle(
            email,
            "echoEmailNotifications",
            false
        );

        restoreToggle(
            history,
            "echoListeningHistory",
            true
        );

        if (
            speedSelect &&
            speedSelect.tagName ===
                "SELECT"
        ) {
            speedSelect.value =
                localStorage.getItem(
                    "echoDefaultSpeed"
                ) || "1";
        }

        autoplay?.addEventListener(
            "change",
            function () {
                saveToggle(
                    autoplay,
                    "echoAutoplay"
                );
            }
        );

        notifications?.addEventListener(
            "change",
            function () {
                saveToggle(
                    notifications,
                    "echoNotifications"
                );
            }
        );

        email?.addEventListener(
            "change",
            function () {
                saveToggle(
                    email,
                    "echoEmailNotifications"
                );
            }
        );

        history?.addEventListener(
            "change",
            function () {
                saveToggle(
                    history,
                    "echoListeningHistory"
                );
            }
        );

        speedSelect?.addEventListener(
            "change",
            function () {
                localStorage.setItem(
                    "echoDefaultSpeed",
                    speedSelect.value
                );

                localStorage.setItem(
                    "echoPlaybackSpeed",
                    speedSelect.value
                );
            }
        );
    }

    function resetPlayerForPageLoad() {
        currentEpisode = null;
        currentShowId = "";
        currentTime = 0;
        isPlaying = false;

        clearPlaybackTimer();

        if (playerEmpty) {
            playerEmpty.textContent =
                "Select an episode to start Listening";

            playerEmpty.style.setProperty(
                "display",
                "flex",
                "important"
            );
        }

        setPlayerContentState(false);

        if (playerImage) {
            playerImage.removeAttribute(
                "src"
            );

            playerImage.alt =
                "";
        }

        if (playerTitle) {
            playerTitle.textContent =
                "";
        }

        if (playerShow) {
            playerShow.textContent =
                "";
        }

        updatePlayIcon();
        updateContinueIndicator();
    }

    function restorePlayerState() {
        const raw =
            localStorage.getItem(
                "echoPlayerState"
            );

        if (!raw) {
            return false;
        }

        let saved;

        try {
            saved =
                JSON.parse(raw);
        } catch (error) {
            localStorage.removeItem(
                "echoPlayerState"
            );

            return false;
        }

        if (
            !saved ||
            !saved.showId ||
            !SHOWS[saved.showId]
        ) {
            return false;
        }

        const show =
            SHOWS[saved.showId];

        const matchingEpisode =
            show.episodes.find(
                function (episode) {
                    return (
                        normalize(
                            episode.title
                        ) ===
                        normalize(
                            saved.title
                        )
                    );
                }
            ) ||
            show.episodes[0];

        if (!matchingEpisode) {
            return false;
        }

        let element = null;

        const candidates =
            document.querySelectorAll(
                ".continue-section .episode, " +
                ".continue-listening .episode, " +
                ".continue-listening-section .episode, " +
                ".saved-episode-card, " +
                ".history-episode-card, " +
                ".show-details .episode-card"
            );

        candidates.forEach(
            function (candidate) {
                if (element) {
                    return;
                }

                const candidateShowId =
                    getShowIdFromElement(
                        candidate
                    );

                const candidateTitle =
                    normalize(
                        getEpisodeTitle(
                            candidate
                        )
                    );

                if (
                    candidateShowId ===
                        saved.showId &&
                    candidateTitle ===
                        normalize(
                            saved.title
                        )
                ) {
                    element =
                        candidate;
                }
            }
        );

        currentEpisode = {
            element,

            showId:
                saved.showId,

            title:
                saved.title ||
                matchingEpisode.title,

            show:
                saved.show ||
                show.title,

            author:
                saved.author ||
                show.author,

            image:
                saved.image ||
                show.image,

            duration:
                Number(
                    saved.duration
                ) ||
                matchingEpisode.duration ||
                show.duration,

            startTime:
                matchingEpisode.startTime ||
                0,

            displayStartTime:
                matchingEpisode.startTime ||
                0,

            displayDuration:
                matchingEpisode.displayDuration ||
                formatTime(
                    Number(
                        saved.duration
                    ) ||
                    show.duration
                )
        };

        currentShowId =
            currentEpisode.showId ||
            "";

        currentTime =
            Math.max(
                0,
                Math.min(
                    currentEpisode.duration ||
                        0,
                    Number(
                        saved.currentTime
                    ) || 0
                )
            );

        isPlaying =
            saved.isPlaying === true;

        updatePlayerDisplay();
        updateFullscreenDisplay();
        updateContinueIndicator();

        if (isPlaying) {
            startPlayback();
        } else {
            clearPlaybackTimer();
            updatePlayIcon();
            savePlayerState();
        }

        return true;
    }


    function ensureEpisodeHoverVideoButtons() {
        document
            .querySelectorAll(
                ".saved-episode-card .saved-episode-image, " +
                ".history-episode-card .saved-episode-image, " +
                ".history-episode-card .history-item-image"
            )
            .forEach(function (imageWrap) {
                if (
                    imageWrap.querySelector(
                        ":scope > .episode-hover-video-button"
                    )
                ) {
                    return;
                }

                imageWrap.style.position =
                    "relative";

                const button =
                    document.createElement(
                        "button"
                    );

                button.type =
                    "button";

                button.className =
                    "video-button episode-hover-video-button";

                button.setAttribute(
                    "aria-label",
                    "Play episode"
                );

                button.setAttribute(
                    "data-action",
                    "play"
                );

                const svg =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "svg"
                    );

                svg.setAttribute(
                    "viewBox",
                    "0 0 16 16"
                );

                svg.setAttribute(
                    "width",
                    "16"
                );

                svg.setAttribute(
                    "height",
                    "16"
                );

                svg.setAttribute(
                    "fill",
                    "currentColor"
                );

                svg.setAttribute(
                    "aria-hidden",
                    "true"
                );

                const path =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                    );

                path.setAttribute(
                    "d",
                    "m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"
                );

                svg.appendChild(
                    path
                );

                button.appendChild(
                    svg
                );

                imageWrap.appendChild(
                    button
                );
            });
    }


    if (isHomePage) {
        document
            .querySelectorAll(
                ".view-button[data-show-id]"
            )
            .forEach(function (button) {
                button.addEventListener(
                    "click",
                    function (event) {
                        event.preventDefault();
                        event.stopPropagation();

                        const showId =
                            button.dataset.showId ||
                            "daily-tech";

                        const episode =
                            createEpisodeFromShow(
                                showId
                            );

                        if (episode) {
                            playVisualEpisode(
                                episode
                            );
                        }

                        openShow(
                            showId,
                            "home"
                        );
                    }
                );
            });

        document
            .querySelectorAll(
                ".podcast-card[data-show-id]"
            )
            .forEach(function (card) {
                card.addEventListener(
                    "click",
                    function (event) {
                        if (
    event.target.closest(
        ".video-button"
    ) &&
    window.innerWidth > 700
) {
    return;
}

                        event.preventDefault();
                        event.stopPropagation();

                        openShow(
                            card.dataset.showId,
                            "home"
                        );
                    }
                );
            });
    }


    document.addEventListener(
        "click",
        function (event) {
            const target =
                event.target;
            const anchor =
                target.closest("a");

            if (
                anchor &&
                normalize(
                    anchor.textContent
                ) === "see all"
            ) {
                anchor.href =
                    "explore.html";

                return;
            }

            const listenButton =
                target.closest(
                    ".listen-button"
                );

            if (listenButton) {
                event.preventDefault();
                event.stopPropagation();

                const episode =
                    createEpisodeFromShow(
                        listenButton.dataset.showId ||
                            "daily-tech"
                    );

                if (episode) {
                    playVisualEpisode(
                        episode
                    );
                }

                return;
            }

            const viewButton =
                target.closest(
                    ".view-button"
                );

            if (viewButton) {
                event.preventDefault();
                event.stopPropagation();

                const showId =
                    viewButton.dataset.showId ||
                    "daily-tech";

                const episode =
                    createEpisodeFromShow(
                        showId
                    );

                if (episode) {
                    playVisualEpisode(
                        episode
                    );
                }

                openShow(
                    showId
                );

                return;
            }

            const videoButton =
                target.closest(
                    ".video-button"
                );

            if (videoButton) {
                event.preventDefault();
                event.stopPropagation();

                const continueEpisode =
                    videoButton.closest(
                        ".continue-section .episode, " +
                        ".continue-listening .episode, " +
                        ".continue-listening-section .episode"
                    );

                if (continueEpisode) {
                    openEpisodePlayer(
                        continueEpisode
                    );

                    return;
                }

                const savedOrHistory =
                    videoButton.closest(
                        ".saved-episode-card, " +
                        ".history-episode-card"
                    );

                if (savedOrHistory) {
                    openEpisodePlayer(
                        savedOrHistory
                    );

                    return;
                }

                const libraryCard =
                    videoButton.closest(
                        ".library-card"
                    );

                if (libraryCard) {
                    openEpisodePlayer(
                        libraryCard
                    );

                    return;
                }

                const card =
                    videoButton.closest(
                        ".podcast-card"
                    );

                const showId =
                    getShowIdFromElement(
                        card
                    );

                const episode =
                    createEpisodeFromShow(
                        showId
                    );

                if (episode) {
                    playVisualEpisode(
                        episode
                    );
                }

                return;
            }


            const podcastCard =
                target.closest(
                    ".podcast-card"
                );

            if (podcastCard) {
                event.preventDefault();
                event.stopPropagation();

                const showId =
                    getShowIdFromElement(
                        podcastCard
                    );

                if (showId) {
                    openShow(
                        showId
                    );
                }

                return;
            }

            const savedOrHistoryCard =
                target.closest(
                    ".saved-episode-card, " +
                    ".history-episode-card"
                );

            if (savedOrHistoryCard) {
                event.preventDefault();
                event.stopPropagation();

                openEpisodePlayer(
                    savedOrHistoryCard
                );

                return;
            }
            const episodeButton =
                target.closest(
                    ".episode-play, " +
                    ".saved-episode-play, " +
                    ".library-play, " +
                    ".history-play"
                );

            if (episodeButton) {
                event.preventDefault();
                event.stopPropagation();

                openEpisodePlayer(
                    episodeButton
                );

                return;
            }

            const continueItem =
                target.closest(
                    ".continue-section .episode, " +
                    ".continue-listening .episode, " +
                    ".continue-listening-section .episode"
                );

            if (continueItem) {
                event.preventDefault();
                event.stopPropagation();

                openEpisodePlayer(
                    continueItem
                );

                return;
            }


            const libraryCard =
                target.closest(
                    ".library-card"
                );

            if (libraryCard) {
                if (
                    target.closest(
                        ".library-play"
                    )
                ) {
                    event.preventDefault();
                    event.stopPropagation();

                    openEpisodePlayer(
                        libraryCard
                    );

                    return;
                }

                event.preventDefault();
                event.stopPropagation();

                const showId =
                    getShowIdFromElement(
                        libraryCard
                    );

                if (showId) {
                    openShow(
                        showId,
                        isLibraryPage
                            ? "library"
                            : "home"
                    );
                }

                return;
            }


            const chartCard =
                target.closest(
                    ".chart-card"
                );

            if (chartCard) {
                event.preventDefault();
                event.stopPropagation();

                const showId =
                    getShowIdFromElement(
                        chartCard
                    );

                if (showId) {
                    openShow(
                        showId,
                        "explore"
                    );
                }

                return;
            }


            const libraryTab =
                target.closest(
                    ".library-tab"
                );

            if (libraryTab) {
                event.preventDefault();
                event.stopPropagation();

                activateLibraryTab(
                    libraryTab
                );

                return;
            }

            if (
                target.closest(
                    "#mainPlay"
                )
            ) {
                event.preventDefault();
                event.stopPropagation();

                togglePlayback();

                return;
            }

            if (
                target.closest(
                    "#previousButton"
                )
            ) {
                event.preventDefault();
                event.stopPropagation();

                playPrevious();

                return;
            }

            if (
                target.closest(
                    "#nextButton"
                )
            ) {
                event.preventDefault();
                event.stopPropagation();

                playNext();

                return;
            }

            if (
                target.closest(
                    "#fullscreenButton"
                )
            ) {
                event.preventDefault();
                event.stopPropagation();

                openExtendedPlayer();

                return;
            }


            if (
                target.closest(
                    "#fullscreenClose"
                )
            ) {
                event.preventDefault();
                event.stopPropagation();

                closeExtendedPlayer();

                return;
            }

            if (
                target.closest(
                    "#fullscreenPlay"
                )
            ) {
                event.preventDefault();
                event.stopPropagation();

                togglePlayback();

                return;
            }

            if (
                target.closest(
                    "#fullscreenPrevious"
                )
            ) {
                event.preventDefault();
                event.stopPropagation();

                playPrevious();

                return;
            }

            if (
                target.closest(
                    "#fullscreenNext"
                )
            ) {
                event.preventDefault();
                event.stopPropagation();

                playNext();

                return;
            }

            
            const fullscreenSkip =
                target.closest(
                    ".fullscreen-skip"
                );

            if (fullscreenSkip) {
                event.preventDefault();
                event.stopPropagation();

                return;
            }


            const speed =
                target.closest(
                    ".speed-button"
                );

            if (speed) {
                event.preventDefault();
                event.stopPropagation();

                const index =
                    PLAYBACK_SPEEDS.indexOf(
                        playbackSpeed
                    );

                playbackSpeed =
                    PLAYBACK_SPEEDS[
                        (
                            index + 1
                        ) %
                            PLAYBACK_SPEEDS.length
                    ];

                localStorage.setItem(
                    "echoPlaybackSpeed",
                    String(
                        playbackSpeed
                    )
                );

                updateSpeedLabel();

                return;
            }

            const latest =
                target.closest(
                    ".latest-episode-button"
                );

            if (latest) {
                event.preventDefault();
                event.stopPropagation();

                const section =
                    latest.closest(
                        ".show-details"
                    );

                const firstEpisode =
                    section?.querySelector(
                        ".episodes-list .episode-card:not([hidden])"
                    );

                if (firstEpisode) {
                    openEpisodePlayer(
                        firstEpisode
                    );
                }

                return;
            }

            const showEpisodeCard =
                target.closest(
                    ".show-details " +
                    ".episodes-list " +
                    ".episode-card"
                );

            if (
                showEpisodeCard &&
                !target.closest(
                    ".episode-play"
                )
            ) {
                event.preventDefault();
                event.stopPropagation();

                openEpisodePlayer(
                    showEpisodeCard
                );

                return;
            }


            const subscribeButton =
                target.closest(
                    ".subscribe-button"
                );

            if (subscribeButton) {
                event.preventDefault();
                event.stopPropagation();

                subscribeButton.classList.toggle(
                    "subscribed"
                );

                if (
                    subscribeButton.classList.contains(
                        "favorite-button"
                    )
                ) {
                    subscribeButton.classList.toggle(
                        "liked"
                    );
                }

                const textElement =
                    subscribeButton.querySelector(
                        ".echo-subscribe-text"
                    );

                if (textElement) {
                    textElement.textContent =
                        "Subscribe";
                } else {
                    const textNode =
                        Array.from(
                            subscribeButton.childNodes
                        ).find(
                            function (node) {
                                return (
                                    node.nodeType ===
                                        Node.TEXT_NODE &&
                                    node.textContent.trim()
                                );
                            }
                        );

                    if (textNode) {
                        textNode.textContent =
                            " Subscribe";
                    }
                }

                return;
            }

            const favorite =
                target.closest(
                    ".favorite-button, " +
                    ".fullscreen-action-heart, " +
                    "#fullscreenHeart"
                );

            if (favorite) {
                event.preventDefault();
                event.stopPropagation();

                favorite.classList.toggle(
                    "liked"
                );

                return;
            }


            const share =
                target.closest(
                    ".share-button, " +
                    ".fullscreen-action-share, " +
                    "#fullscreenShare"
                );

            if (share) {
                event.preventDefault();
                event.stopPropagation();

                share.classList.toggle(
                    "shared"
                );

                share.setAttribute(
                    "aria-pressed",
                    share.classList.contains(
                        "shared"
                    )
                        ? "true"
                        : "false"
                );

                const shareUrl =
                    window.location.href;

                if (
                    navigator.share
                ) {
                    navigator
                        .share({
                            title:
                                document.title,
                            url: shareUrl
                        })
                        .catch(
                            function () {}
                        );
                } else if (
                    navigator.clipboard &&
                    navigator.clipboard.writeText
                ) {
                    navigator.clipboard
                        .writeText(
                            shareUrl
                        )
                        .catch(
                            function () {}
                        );
                }

                return;
            }


            const utility =
                target.closest(
                    ".bottom-icon-button"
                );

            if (utility) {
                event.preventDefault();
                event.stopPropagation();

                utility.classList.toggle(
                    "active"
                );

                return;
            }


            const showTab =
                target.closest(
                    ".show-tab"
                );

            if (showTab) {
                const label =
                    normalize(
                        showTab.textContent
                    );

                event.preventDefault();
                event.stopPropagation();

                if (
                    label === "about"
                ) {
                    showAbout(
                        showTab
                    );
                } else {
                    showEpisodes(
                        showTab
                    );
                }

                return;
            }
        }
    );

    function handleBrowserHistory() {
        const url =
            new URL(
                window.location.href
            );

        const requestedShow =
            url.searchParams.get(
                "show"
            );

        if (
            requestedShow &&
            SHOWS[requestedShow] &&
            !isSettingsPage
        ) {
            const section =
                document.getElementById(
                    requestedShow
                );

            if (
                section &&
                section.classList.contains(
                    "show-details"
                )
            ) {
                showOnlySection(
                    section
                );

                document.title =
                    "Echo - " +
                    SHOWS[
                        requestedShow
                    ].title;

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

                return;
            }
        }

        if (
            isHomePage ||
            isExplorePage ||
            isLibraryPage
        ) {
            restoreNormalPageView(
                false
            );
        }
    }

    document
        .querySelectorAll(
            ".hash-icon"
        )
        .forEach(function (item) {
            item.remove();
        });

    dedupeShowSections();
    ensureLibraryHistoryEpisodes();
    ensureEpisodeHoverVideoButtons();
    normalizeSettingsUi();
    ensureShowActionButtons();

    document
        .querySelectorAll(
            ".show-details"
        )
        .forEach(
            prepareShowSection
        );

    normalizeShowEpisodeNumbers();
    normalizeTopCharts();
    ensureTopChartStats();
    ensureUniversalPlayingIndicators();

    bindProgressBar();
    bindNormalVolumeDrag();
    bindFullscreenVolumeDrag();

    updateNormalVolume();
    updateSpeedLabel();
    updatePlayIcon();

   const echoNavigationRestore =
    sessionStorage.getItem("echoNavigationRestore") === "1";

sessionStorage.removeItem("echoNavigationRestore");

if (isFullRefresh) {

    localStorage.removeItem("echoPlayerState");
    resetPlayerForPageLoad();

} else if (echoNavigationRestore) {


    if (!restorePlayerState()) {
        resetPlayerForPageLoad();
    }

} else {

    localStorage.removeItem("echoPlayerState");
    resetPlayerForPageLoad();
}

    if (fullscreenPlayer) {
        fullscreenPlayer.classList.remove(
            "show"
        );
    }

    if (isLibraryPage) {
        const activeTab =
            document.querySelector(
                ".library-tab.active"
            ) ||
            document.querySelector(
                '.library-tab[data-tab="subscribed"]'
            );

        if (activeTab) {
            activateLibraryTab(
                activeTab
            );
        }
    }
    const params =
        new URLSearchParams(
            window.location.search
        );

    const requestedShow =
        params.get("show");

    if (
        requestedShow &&
        SHOWS[requestedShow] &&
        !isSettingsPage
    ) {
        const section =
            document.getElementById(
                requestedShow
            );

        if (
            section &&
            section.classList.contains(
                "show-details"
            )
        ) {
            openShow(
                requestedShow,
                isHomePage
                    ? "home"
                    : isExplorePage
                        ? "explore"
                        : "library",
                false
            );
        }
    }


    setupSettingsFunctionality();


    document
        .querySelectorAll(
            'a[href="settings.html"]'
        )
        .forEach(function (link) {
            link.setAttribute(
                "href",
                "setting.html"
            );
        });

    document
        .querySelectorAll("a")
        .forEach(function (link) {
            if (
                normalize(
                    link.textContent
                ) === "see all"
            ) {
                link.setAttribute(
                    "href",
                    "explore.html"
                );
            }
        });
document.addEventListener(
    "click",
    function (event) {

        const skipButton = event.target.closest(
            "#previousButton, " +
            "#nextButton, " +
            "#fullscreenPrevious, " +
            "#fullscreenNext, " +
            ".fullscreen-skip"
        );

        if (skipButton) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
        }

        if (
            document.body.classList.contains(
                "music-file-extended-page"
            )
        ) {
            const extendedAction = event.target.closest(
                ".fullscreen-action-heart, " +
                ".fullscreen-action-share, " +
                "#fullscreenHeart, " +
                "#fullscreenShare"
            );

            if (extendedAction) {
                event.preventDefault();
                event.stopImmediatePropagation();
                return;
            }
        }

    },
    true
);


    document.addEventListener(
        "click",
        function (event) {
            const link =
                event.target.closest(
                    "a[href]"
                );

            if (!link) {
                return;
            }

            const href =
                link.getAttribute(
                    "href"
                ) || "";

            const cleanHref =
                href
                    .split("#")[0]
                    .split("?")[0]
                    .toLowerCase();

            const sectionNavigation =
                cleanHref ===
                    "index.html" ||
                cleanHref === "" ||
                cleanHref ===
                    "explore.html" ||
                cleanHref ===
                    "library.html" ||
                cleanHref ===
                    "setting.html" ||
                cleanHref ===
                    "settings.html";

            if (!sectionNavigation) {
                return;
            }

            const samePage =
                (
                    isHomePage &&
                    (
                        cleanHref ===
                            "index.html" ||
                        cleanHref === ""
                    )
                ) ||
                (
                    isExplorePage &&
                    cleanHref ===
                        "explore.html"
                ) ||
                (
                    isLibraryPage &&
                    cleanHref ===
                        "library.html"
                ) ||
                (
                    isSettingsPage &&
                    (
                        cleanHref ===
                            "setting.html" ||
                        cleanHref ===
                            "settings.html"
                    )
                );

            if (samePage) {
                return;
            }

            if (currentEpisode) {
                savePlayerState();

                sessionStorage.setItem(
                    "echoNavigationRestore",
                    "1"
                );
            } else {
                sessionStorage.removeItem(
                    "echoNavigationRestore"
                );
            }
        },
        true
    );

    function syncSidebarActiveState() {
        const wanted =
            isHomePage
                ? "index.html"
                : isExplorePage
                    ? "explore.html"
                    : isLibraryPage
                        ? "library.html"
                        : "setting.html";

        document
            .querySelectorAll(
                ".sidebar .menu-item"
            )
            .forEach(function (item) {
                const href =
                    (
                        item.getAttribute(
                            "href"
                        ) || ""
                    )
                        .split("?")[0]
                        .split("#")[0]
                        .toLowerCase();

                const active =
                    href === wanted ||
                    (
                        isHomePage &&
                        href === ""
                    ) ||
                    (
                        isSettingsPage &&
                        href ===
                            "settings.html"
                    );

                item.classList.toggle(
                    "active",
                    active
                );
            });
    }

    syncSidebarActiveState();


    window.addEventListener(
        "popstate",
        function () {
            handleBrowserHistory();

            syncSidebarActiveState();
        }
    );

    window.addEventListener(
        "keydown",
        function (event) {
            if (
                event.key ===
                "Escape"
            ) {
                closeExtendedPlayer();
            }
        }
    );

    window.addEventListener(
        "pagehide",
        function () {
            savePlayerState();
        }
    );

    window.addEventListener(
        "beforeunload",
        function () {
            savePlayerState();
        }
    );

    function ensureHistoryClockIcons() {
        if (!isLibraryPage) {
            return;
        }

        document
            .querySelectorAll(
                "#history-section .saved-episode-meta"
            )
            .forEach(function (meta) {
                const durationHost =
                    meta.querySelector(
                        ".episode-duration"
                    ) ||
                    meta.lastElementChild;

                if (!durationHost) {
                    return;
                }

                durationHost
                    .querySelectorAll(
                        "svg"
                    )
                    .forEach(
                        function (svg) {
                            svg.remove();
                        }
                    );

                const clock =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "svg"
                    );

                clock.setAttribute(
                    "viewBox",
                    "0 0 16 16"
                );

                clock.setAttribute(
                    "width",
                    "12"
                );

                clock.setAttribute(
                    "height",
                    "12"
                );

                clock.setAttribute(
                    "fill",
                    "currentColor"
                );

                clock.setAttribute(
                    "aria-hidden",
                    "true"
                );

                clock.classList.add(
                    "echo-history-clock"
                );

                const path =
                    document.createElementNS(
                        "http://www.w3.org/2000/svg",
                        "path"
                    );

                path.setAttribute(
                    "d",
                    "M8 3.5a.5.5 0 0 1 .5.5v3.5H11a.5.5 0 0 1 0 1H8a.5.5 0 0 1-.5-.5V4A.5.5 0 0 1 8 3.5ZM8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16Zm0-1A7 7 0 1 1 8 1a7 7 0 0 1 0 14Z"
                );

                clock.appendChild(
                    path
                );

                durationHost.insertBefore(
                    clock,
                    durationHost.firstChild
                );
            });
    }


    function syncSavedHistoryCards() {
        if (!isLibraryPage) {
            return;
        }

        const historyCards =
            document.querySelectorAll(
                "#history-section .history-episode-card"
            );

        const savedCards =
            document.querySelectorAll(
                "#saved-episodes-section .saved-episode-card"
            );

        if (
            !historyCards.length ||
            !savedCards.length
        ) {
            return;
        }

        savedCards.forEach(
            function (card) {
                card.classList.add(
                    "echo-history-dimensions"
                );
            }
        );
    }
document.addEventListener("click", function () {
    if (!document.body.classList.contains("echo-inline-show-page")) {
        return;
    }

    setTimeout(function () {
        const section = document.querySelector(".show-details.active");

        if (!section) return;

        console.log("ACTIVE SHOW:", section);
        console.log("PARENT:", section.parentElement);
        console.log("SHOW TOP AREA:", section.querySelector(".show-top-area"));

        const rect = section.getBoundingClientRect();

        console.log("SHOW TOP:", rect.top);
        console.log("SHOW LEFT:", rect.left);
        console.log("SHOW HEIGHT:", rect.height);

        const parent = section.parentElement;

        console.log(
            "PARENT TOP:",
            parent.getBoundingClientRect().top
        );

        console.log(
            "PARENT PADDING TOP:",
            getComputedStyle(parent).paddingTop
        );

        console.log(
            "PARENT MARGIN TOP:",
            getComputedStyle(parent).marginTop
        );
    }, 100);
});

    ensureHistoryClockIcons();
    syncSavedHistoryCards();
    syncFinalPlayingIndicators();
    syncSidebarActiveState();
document.addEventListener("click", function (event) {

    const shareButton = event.target.closest(".share-button");

    if (!shareButton) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

}, true);
document.addEventListener(
    "click",
    function (event) {

        const videoButton =
            event.target.closest(".video-button");

        if (!videoButton) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();



        const continueEpisode =
            videoButton.closest(
                ".continue-section .episode"
            );

        if (continueEpisode) {

            openEpisodePlayer(
                continueEpisode
            );

            return;
        }

        const savedOrHistory =
            videoButton.closest(
                ".saved-episode-card, " +
                ".history-episode-card"
            );

        if (savedOrHistory) {

            openEpisodePlayer(
                savedOrHistory
            );

            return;
        }

        const libraryCard =
            videoButton.closest(
                ".library-card"
            );

        if (libraryCard) {

            openEpisodePlayer(
                libraryCard
            );

            return;
        }

        const podcastCard =
            videoButton.closest(
                ".podcast-card"
            );

        if (podcastCard) {

            const showId =
                getShowIdFromElement(
                    podcastCard
                );

            if (!showId) {
                return;
            }

            const episode =
                createEpisodeFromShow(
                    showId
                );

            if (!episode) {
                return;
            }

            currentEpisode =
                episode;

            currentTime =
                episode.startTime;

            updatePlayerDisplay();
            updateFullscreenDisplay();
            updateContinueIndicator();

            startPlayback();
            savePlayerState();

            return;
        }

    },
    true
);

});