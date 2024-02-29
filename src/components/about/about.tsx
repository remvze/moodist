import { Container } from '@/components/container';
import { count as soundCount } from '@/lib/sounds';

import styles from './about.module.css';

export function About() {
  const count = soundCount();

  const paragraphs = [
    {
      body: 'Craving a calming escape from the daily grind? Do you need the perfect soundscape to boost your focus or lull you into peaceful sleep? Look no further than Moodist, your free and open-source ambient sound generator! Ditch the subscriptions and registrations – with Moodist, you unlock a world of soothing and immersive audio experiences, entirely for free.',
      title: 'Free Ambient Sounds',
    },
    {
      body: `Dive into an expansive library of ${count} carefully curated sounds. Nature lovers will find solace in the gentle murmur of streams, the rhythmic crash of waves, or the crackling warmth of a campfire. Cityscapes come alive with the soft hum of cafes, the rhythmic clatter of trains, or the calming white noise of traffic. And for those seeking deeper focus or relaxation, Moodist offers binaural beats and color noise designed to enhance your state of mind.`,
      title: 'Carefully Curated Sounds',
    },
    {
      body: 'The beauty of Moodist lies in its simplicity and customization. No complex menus or confusing options – just choose your desired sounds, adjust the volume balance, and hit play. Want to blend the gentle chirping of birds with the soothing sound of rain? No problem! Layer as many sounds as you like to create your personalized soundscape oasis.',
      title: 'Create Your Soundscape',
    },
    // {
    //   body: 'Moodist goes beyond just ambient sounds by offering a suite of productivity tools to help you stay organized and focused. Utilize the built-in pomodoro timer to structure your workday in focused intervals, jot down thoughts and ideas in the simple notepad, and keep track of your tasks with the handy to-do list. These tools seamlessly integrate with the ambient soundscapes, allowing you to create a personalized environment that fosters both focus and relaxation.',
    //   title: 'A Productivity Toolbox',
    // },
    {
      body: "Whether you're looking to unwind after a long day, enhance your focus during work, or lull yourself into a peaceful sleep, Moodist has the perfect soundscape waiting for you. The best part? It's completely free and open-source, so you can enjoy its benefits without any strings attached. Start using Moodist today and discover your new haven of tranquility and focus!",
      title: 'Sounds for Every Moment',
    },
  ];

  const handleClick = () => {
    const app = document.getElementById('app');

    app?.scrollIntoView();
  };

  return (
    <section className={styles.about}>
      <div className={styles.effect} />

      <Container tight>
        {paragraphs.map((paragraph, index) => (
          <div className={styles.paragraph} key={index}>
            <div className={styles.counter}>
              <span>0{index + 1}</span> / 0{paragraphs.length}
            </div>

            <h2 className={styles.title}>{paragraph.title}</h2>
            <p className={styles.body}>{paragraph.body}</p>
          </div>
        ))}

        <button className={styles.button} onClick={handleClick}>
          Use Moodist
        </button>
      </Container>
    </section>
  );
}
