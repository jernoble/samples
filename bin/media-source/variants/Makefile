AVSYNCTEST := /Volumes/Users/jer/Library/Developer/Xcode/DerivedData/AVSyncTest-bmgozunpxpypzfamdxegovifmpup/Build/Products/Debug/AVSyncTest

all: h264-1080p-30hz.mp4 h264-320x240-15hz.mp4 h264-4k-30hz.mp4 h264-640x480-30hz.mp4 h264-720p-30hz.mp4 hevc-1080p-30hz.mp4 hevc-320x240-15hz.mp4 hevc-4k-30hz.mp4 hevc-640x480-30hz.mp4 hevc-720p-30hz.mp4 h264-4k-60hz.mp4 hevc-4k-60hz.mp4

h264-320x240-15hz.mp4: $(AVSYNCTEST)
	$(AVSYNCTEST) --width 320 --height 240 --timescale 15 --count 30 --title "H.264" --encoder avc1 $@
	MP4Box -frag 2000 $@

h264-640x480-30hz.mp4: $(AVSYNCTEST)
	$(AVSYNCTEST) --width 640 --height 480 --timescale 30 --count 60 --title "H.264" --encoder avc1 $@
	MP4Box -frag 2000 $@

h264-720p-30hz.mp4: $(AVSYNCTEST)
	$(AVSYNCTEST) --width 1280 --height 720 --timescale 30 --count 60 --title "H.264" --encoder avc1 $@
	MP4Box -frag 2000 $@

h264-1080p-30hz.mp4: $(AVSYNCTEST)
	$(AVSYNCTEST) --width 1920 --height 1080 --timescale 30 --count 60 --title "H.264" --encoder avc1 $@
	MP4Box -frag 2000 $@

h264-4k-30hz.mp4: $(AVSYNCTEST)
	$(AVSYNCTEST) --width 3840 --height 2160 --timescale 30 --count 60 --title "H.264" --encoder avc1 $@
	MP4Box -frag 2000 $@

h264-4k-60hz.mp4: $(AVSYNCTEST)
	$(AVSYNCTEST) --width 3840 --height 2160 --timescale 60 --count 120 --title "H.264" --encoder avc1 $@
	MP4Box -frag 2000 $@

hevc-320x240-15hz.mp4: $(AVSYNCTEST)
	$(AVSYNCTEST) --width 320 --height 240 --timescale 15 --count 30 --title "HEVC" --encoder hvc1 $@
	MP4Box -frag 2000 $@

hevc-640x480-30hz.mp4: $(AVSYNCTEST)
	$(AVSYNCTEST) --width 640 --height 480 --timescale 30 --count 60 --title "HEVC" --encoder hvc1 $@
	MP4Box -frag 2000 $@

hevc-720p-30hz.mp4: $(AVSYNCTEST)
	$(AVSYNCTEST) --width 1280 --height 720 --timescale 30 --count 60 --title "HEVC" --encoder hvc1 $@
	MP4Box -frag 2000 $@

hevc-1080p-30hz.mp4: $(AVSYNCTEST)
	$(AVSYNCTEST) --width 1920 --height 1080 --timescale 30 --count 60 --title "HEVC" --encoder hvc1 $@
	MP4Box -frag 2000 $@

hevc-4k-30hz.mp4: $(AVSYNCTEST)
	$(AVSYNCTEST) --width 3840 --height 2160 --timescale 30 --count 60 --title "HEVC" --encoder hvc1 $@
	MP4Box -frag 2000 $@

hevc-4k-60hz.mp4: $(AVSYNCTEST)
	$(AVSYNCTEST) --width 3840 --height 2160 --timescale 60 --count 120 --title "HEVC" --encoder hvc1 $@
	MP4Box -frag 2000 $@
