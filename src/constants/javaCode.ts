/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const STANDARD_JAVA_CODE = `import java.util.Scanner;
import java.util.Locale;

/**
 * =========================================================
 * PROJE: Vücut Kitle İndeksi (VKİ) Hesaplama
 * DERS:  Java 101 / Temel Programlama
 * ÖDEV SAHİBİ: Enes Öztürk
 * =========================================================
 *
 * Formül:
 * Kilo (kg) / (Boy(m) * Boy(m))
 *
 * Örnek Çıktı:
 * Lütfen boyunuzu (metre cinsinde) giriniz : 1,72
 * Lütfen kilonuzu giriniz : 105
 * Vücut Kitle İndeksiniz : 35.49215792320173
 */
public class Main {
    public static void main(String[] args) {
        // Kullanıcıdan veri girişi almak için Scanner nesnesi oluşturuluyor
        Scanner input = new Scanner(System.in);
        
        // Türkçe sayı formatında ondalık basamaklar virgül (,) ile girildiği için
        // Scanner'ın Locale ayarını Türkçe yapıyoruz (1,72 girişine tam uyum için)
        input.useLocale(Locale.forLanguageTag("tr-TR"));

        // Gerekli değişkenlerin tanımlanması (hassas ondalıklı sayılar için double tipi)
        double boy;
        double kilo;
        double vki;

        // 1. Kullanıcıdan metre cinsinden boy değerini isteme
        System.out.print("Lütfen boyunuzu (metre cinsinde) giriniz : ");
        boy = input.nextDouble();

        // 2. Kullanıcıdan kilogram cinsinden kilo değerini isteme
        System.out.print("Lütfen kilonuzu giriniz : ");
        kilo = input.nextDouble();

        // 3. Vücut Kitle İndeksi Hesabı
        // DİKKAT: İşlem önceliği kuralı gereği (boy * boy) parantez içine alınmalıdır.
        // Aksi takdirde "kilo / boy * boy" işlemi soldan sağa çalışarak sadece kilo değerini verir!
        vki = kilo / (boy * boy);

        // 4. Sonucun ekrana yazdırılması (Tam istenilen formatta)
        System.out.println("Vücut Kitle İndeksiniz : " + vki);

        // Ödev İmza ve Bitiş Bilgisi
        System.out.println("----------------------------------------------");
        System.out.println("Ödev Hazırlayan: Enes Öztürk");
        System.out.println("----------------------------------------------");

        // Kaynak sızıntısını önlemek için scanner kapatılır
        input.close();
    }
}
`;

export const ROBUST_JAVA_CODE = `import java.util.Scanner;

/**
 * Vücut Kitle İndeksi Hesaplama (Hem virgül hem nokta toleranslı versiyon)
 * Hazırlayan: Enes Öztürk
 */
public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        System.out.println("==================================================");
        System.out.println("   VÜCUT KİTLE İNDEKSİ (VKİ) HESAPLAMA PROGRAMI   ");
        System.out.println("   Hazırlayan: Enes Öztürk                        ");
        System.out.println("==================================================");

        try {
            // Kullanıcı ister 1.72 ister 1,72 yazsın, her iki durumu da hatasız çözer
            System.out.print("Lütfen boyunuzu (metre cinsinde) giriniz : ");
            String boyStr = input.next().replace(",", ".");
            double boy = Double.parseDouble(boyStr);

            System.out.print("Lütfen kilonuzu giriniz : ");
            String kiloStr = input.next().replace(",", ".");
            double kilo = Double.parseDouble(kiloStr);

            if (boy <= 0 || kilo <= 0) {
                System.out.println("Hata: Boy ve kilo sıfırdan büyük olmalıdır!");
                return;
            }

            // VKİ Hesaplama Formülü: kilo / (boy * boy)
            double vki = kilo / (boy * boy);

            System.out.println("Vücut Kitle İndeksiniz : " + vki);

            // Sağlık Durumu Değerlendirmesi
            System.out.print("Sağlık Durumunuz       : ");
            if (vki < 18.5) {
                System.out.println("Zayıf");
            } else if (vki < 25.0) {
                System.out.println("Normal Kilo");
            } else if (vki < 30.0) {
                System.out.println("Fazla Kilolu");
            } else if (vki < 35.0) {
                System.out.println("1. Derece Obezite");
            } else if (vki < 40.0) {
                System.out.println("2. Derece Obezite");
            } else {
                System.out.println("3. Derece (Morbid) Obezite");
            }

        } catch (NumberFormatException e) {
            System.out.println("Geçersiz bir sayı girdiniz! Lütfen örn: 1,72 veya 105 giriniz.");
        } finally {
            System.out.println("--------------------------------------------------");
            System.out.println("Ödev Başarıyla Tamamlandı. İmza: Enes Öztürk");
            input.close();
        }
    }
}
`;

export const OOP_JAVA_CODE = `import java.util.Scanner;
import java.util.Locale;

/**
 * Nesne Yönelimli Programlama (OOP) Yaklaşımı ile VKİ Hesaplayıcı
 * Hazırlayan: Enes Öztürk
 */
class Kisi {
    private String adSoyad;
    private double boyMetre;
    private double kiloKg;

    public Kisi(String adSoyad, double boyMetre, double kiloKg) {
        this.adSoyad = adSoyad;
        this.boyMetre = boyMetre;
        this.kiloKg = kiloKg;
    }

    public double vucutKitleIndeksiHesapla() {
        return this.kiloKg / (this.boyMetre * this.boyMetre);
    }

    public String durumDegerlendir() {
        double vki = vucutKitleIndeksiHesapla();
        if (vki < 18.5) return "Zayıf";
        if (vki < 25.0) return "Normal";
        if (vki < 30.0) return "Fazla Kilolu";
        if (vki < 35.0) return "1. Derece Obezite";
        if (vki < 40.0) return "2. Derece Obezite";
        return "3. Derece Morbid Obezite";
    }

    public void raporYazdir() {
        System.out.println("Vücut Kitle İndeksiniz : " + vucutKitleIndeksiHesapla());
        System.out.println("Kategori               : " + durumDegerlendir());
        System.out.println("Raporlayan             : " + this.adSoyad);
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        input.useLocale(Locale.forLanguageTag("tr-TR"));

        System.out.print("Lütfen boyunuzu (metre cinsinde) giriniz : ");
        double boy = input.nextDouble();

        System.out.print("Lütfen kilonuzu giriniz : ");
        double kilo = input.nextDouble();

        // Enes Öztürk adına nesne oluşturulup hesaplama yapılıyor
        Kisi kullanici = new Kisi("Enes Öztürk", boy, kilo);
        kullanici.raporYazdir();

        input.close();
    }
}
`;
