<div class="avatars">
    <a href="#" class="avatars__item"
        ><img
            class="avatar"
            src="https://pbs.twimg.com/profile_images/1699794493342638080/CcUiL4Ie_400x400.jpg"
            alt=""
        /></a
    >
    <a href="#" class="avatars__item"
        ><img
            class="avatar"
            src="https://pbs.twimg.com/profile_images/1395027028399771651/H8W2pnUN_400x400.jpg"
            alt=""
        /></a
    >
    <a href="#" class="avatars__item"
        ><img
            class="avatar"
            src="https://pbs.twimg.com/profile_images/1651688795429822464/cmDeEncE_400x400.jpg"
            alt=""
        /></a
    >
    <a href="#" class="avatars__item"
        ><img
            class="avatar"
            src="https://pbs.twimg.com/profile_images/1581014308397502464/NPogKMyk_400x400.jpg"
            alt=""
        /></a
    >
</div>

<style lang="postcss">
 .avatars {
	 display: flex;
	 list-style-type: none;
	 margin: auto;
	 padding: 0px;
	 flex-direction: row;
}
 .avatars__item {
	 background-color: #596376;
	 border: 2px solid #1f2532;
	 border-radius: 100%;
	 color: #fff;
	 display: block;
	 font-family: sans-serif;
	 font-size: 12px;
	 font-weight: 100;
	 height: 45px;
	 width: 45px;
	 line-height: 45px;
	 text-align: center;
	 transition: margin 0.1s ease-in-out;
	 overflow: hidden;
	 margin-left: -10px;
}
 .avatars__item:first-child {
	 z-index: 5;
}
 .avatars__item:nth-child(2) {
	 z-index: 4;
}
 .avatars__item:nth-child(3) {
	 z-index: 3;
}
 .avatars__item:nth-child(4) {
	 z-index: 2;
}
 .avatars__item:nth-child(5) {
	 z-index: 1;
}
 .avatars__item:last-child {
	 z-index: 0;
}
 .avatars__item img {
	 width: 100%;
}
 .avatars:hover .avatars__item {
	 margin-right: 10px;
}
 
</style>
