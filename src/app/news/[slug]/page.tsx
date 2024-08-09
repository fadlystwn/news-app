import styles from './news.module.css';

const dummyPostData = {
  title: "This is a Dummy Post Title",
  image: "https://via.placeholder.com/300",
  date: "2024-08-08",
  author: "Dummy Author",
  content: "Russia's full-scale invasion of Ukraine was conceived in the Kremlin as a short, sharp military operation. The expectation was that it would take a matter of days, a few weeks maximum, for Russia to establish control over its neighbour. That was nearly two-and-a-half years ago. The war in Ukraine rages on. It has not gone at all as Moscow had intended. But here's the thing. Over the last 29 months, so often we've heard senior Russian officials claiming that the operation is going “according to plan.” President Vladimir Putin last said that in May, despite everything that had happened in the preceding two years: the heavy Russian casualties on the battlefield, the destruction of multiple Russian warships in the Black Sea, drone attacks deep inside Russia (even on the Kremlin itself), the shelling of Russian towns and villages near the Ukrainian border, the mutiny by Wagner mercenary fighters who had marched on Moscow. Now there is a new addition to the list: this week's cross-border Ukrainian assault on Russia's Kursk region. First, a disclaimer: it's difficult to know exactly what is happening right now in the Sudzha district of Kursk region. It is unclear how many Ukrainian troops are there, how much territory they have seized and what their final objective may be. Today's edition of the Russian broadsheet Nezavisimaya Gazeta declared: “Events on the Kursk front are shrouded in the notorious fog of war.” But even in fog, some things are clear. It's evident that what is unfolding in Kursk region is further evidence that Russia's war in Ukraine has not gone 'according to plan'. Events appear to have taken Russia's political and military leadership completely by surprise. Don't expect Moscow to admit that. More likely, Russian officials will use the Ukrainian assault to try to rally the Russian public around the government and bolster the official Kremlin narrative that (a) in this conflict Russia is not the aggressor, and (b) Russia is a besieged fortress surrounded by enemies who are plotting to invade and destroy it."
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = dummyPostData;

  return (
    <div className={styles.container}>
      <h1 className={styles.headline}>{params.slug}</h1>
      {post.image && <img src={post.image} alt={post.title} className={styles.image} />}
      <div className={styles.metadata}>
        <span>{post.date} | By {post.author}</span>
      </div>
      <div className={styles.content}>{post.content}</div>
    </div>
  )
}