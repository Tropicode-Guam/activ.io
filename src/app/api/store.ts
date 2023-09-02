const placesChoices = [
    {
        "id": 0,
        "title": "Pagat Caves",
        "desc": "Enjoy this 2.7-km out-and-back trail near Yigo. Generally considered a moderately challenging route, it takes an average of 1 h 4 min to complete. This is a very popular area for hiking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime.",
        "pos": [13.49995, 144.87714],
        "type": "hike",
        "state": "Guam",
        "img": "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_777/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/peh07lgpjbxzdmzoz34i/PagatCavesTrekkingExperienceinGuam.webp"
    },
    {
        "id": 1,
        "title": "Tarzan Falls",
        "desc": "Discover this 2.6-km out-and-back trail near Santa Rita. Generally considered a moderately challenging route, it takes an average of 51 min to complete. This is a very popular area for hiking and walking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome and may be off-leash in some areas.",
        "pos": [13.388, 144.72222],
        "type": "hike",
        "state": "Guam",
        "img": "https://bloximages.newyork1.vip.townnews.com/postguam.com/content/tncms/assets/v3/editorial/b/f1/bf1066c6-d89c-11e6-b31e-4bf8a55df0ac/58773a43c066c.image.jpg?crop=1662%2C873%2C0%2C186&resize=1200%2C630&order=crop%2Cresize"
    },
    {
        "id": 2,
        "title": "Mount Lam Lam Trail",
        "desc": "Discover this 4.3-km out-and-back trail near Agat. Generally considered a moderately challenging route, it takes an average of 1 h 39 min to complete. This is a very popular area for hiking and walking, so you'll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome and may be off-leash in some areas.",
        "pos": [13.32585, 144.66659],
        "type": "hike",
        "state": "Guam",
        "img": "https://i.ytimg.com/vi/4AiLi8S7OOA/maxresdefault.jpg"
    },
    {
        "id": 3,
        "title": "Chamorro Village",
        "desc": "Nestled in Guam’s capital city of Hagatna is a place where island residents and visitors gather for mouth-watering local and international cuisine, arts and crafts and novelty gifts.\n\nThe Chamorro Village is open every day of the week but is best known for its Wednesday Night Market. It is not uncommon to notice the smell of barbecue as you walk through Spanish influenced buildings that lead you to a center court where people of all ages dance the night away. You can also find farmers displaying local produce grown under their care and local dance groups entertaining the crowd. Fresh fruit juices are usually available to quench your thirst after a long, hot day. In addition, carabao rides and other cultural activities are simply a few steps away. The Chamorro Village is also ideally located near the Hagatna Marina, Paseo de Susanna and across the street from Skinner Plaza and the Guam Museum.\n\nWith a mission to maintain a place that encourages and promotes made on Guam products and small businesses, the Chamorro Village is the perfect place for visitors to experience being part of the island’s extended family. It is also a hub for the local community that perpetuates Guam’s culture and traditions.",
        "pos": [13.4775464,144.7498748],
        "type": "attraction",
        "state": "Guam",
        "img": "https://www.guam.co.kr/data/sightseeing/143936194019134500.jpg"
    },
    {
        "id": 4,
        "title": "Black Cat Cafe",
        "desc": "Lit from within by a neon purple sign, Black Cat Cafe is a new favorite haunt for anime lovers and a vibrant spot for bar-hoppers looking to start their night out with something a little different.\n\nLocated on the first floor of the Grand Plaza Hotel in Tumon, Black Cat was inspired by Japanese “concept cafes,” where patrons can enjoy drinks in a lively themed environment.",
        "pos": [13.5082475,144.8019251],
        "type": "bar",
        "state": "Guam",
        "img": "https://bloximages.newyork1.vip.townnews.com/guampdn.com/content/tncms/assets/v3/editorial/e/47/e47b253e-33c9-11ed-a72c-837e99bd1241/632129cd4b94f.image.jpg?resize=1396%2C1028"
    },
]

export const places = Array(60).fill(null).map((_, i) => {
    let choice = placesChoices[Math.floor(Math.random()*placesChoices.length)]
    const origin = [13.443, 144.7707]
    const t = (Math.random() - 0.5) * 2;
    const y = t * .1
    const x = (Math.random() - 0.5) * .15 + t * .1
    return {
        ...choice,
        pos: [origin[0]+x, origin[1]+y],
        id: i
    }
})