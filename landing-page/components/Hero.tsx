import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            問題集、何周したか<br />
            覚えてますか？
          </h1>
          <p className={styles.subtitle}>
            資格試験の勉強で一番大事なのは、問題集を繰り返すこと。<br />
            でも記録するのって面倒ですよね。<br />
            RepeatMasterなら、タップするだけで周回記録が完了します。
          </p>
          <div className={styles.ctaButtons}>
            <a href="#pricing" className={styles.primaryButton}>
              無料で始める
            </a>
            <a href="#features" className={styles.secondaryButton}>
              機能を見る
            </a>
          </div>
          <p className={styles.notice}>
            ※ 3冊まで完全無料。クレジットカード不要。
          </p>
        </div>
      </div>
    </section>
  )
}
