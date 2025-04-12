import { useState } from 'react';
import { Button } from '../src/components/ui/button';
import { Label } from '../src/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { cn } from "../src/lib/utlis";
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

import { useEffect } from 'react';
// Quiz Data (Questions and Answers)
interface QuizQuestion {
    question: string;
    options: { text: string; isCorrect: boolean }[];
}

const quizData: QuizQuestion[] = [
    {
        question: "Sonlu özdevinir (finite automata) modeli ne tür giriş ve çıkışlara sahiptir?",
        options: [
            { text: "Sürekli", isCorrect: false },
            { text: "Kesikli", isCorrect: true },
            { text: "Rastgele", isCorrect: false },
            { text: "Analog", isCorrect: false },
        ],
    },
    {
        question: "Aşağıdakilerden hangisi sonlu özdevinir modelinin bir türü değildir?",
        options: [
            { text: "Sonlu durumlu tanıyıcı", isCorrect: true },
            { text: "Çıkış üreten özdevinir", isCorrect: true },
            { text: "Deterministik sonlu özdevinir", isCorrect: true },
            { text: "Sürekli durum makinesi", isCorrect: false },
        ],
    },
    {
        question: "Deterministik Sonlu Özdevinir (DFA) modeli kaç bileşenden oluşur?",
        options: [
            { text: "3", isCorrect: false },
            { text: "4", isCorrect: false },
            { text: "5", isCorrect: true },
            { text: "6", isCorrect: false },
        ],
    },
    {
        question: "DFA modelinde Q neyi temsil eder?",
        options: [
            { text: "Giriş simgeleri kümesi", isCorrect: false },
            { text: "Durumlar kümesi", isCorrect: true },
            { text: "Geçiş fonksiyonu", isCorrect: false },
            { text: "Başlangıç durumu", isCorrect: false },
        ],
    },
    {
        question: "DFA modelinde Σ neyi temsil eder?",
        options: [
            { text: "Durumlar kümesi", isCorrect: false },
            { text: "Giriş simgeleri kümesi", isCorrect: true },
            { text: "Geçiş fonksiyonu", isCorrect: false },
            { text: "Uç durumlar kümesi", isCorrect: false },
        ],
    },
    {
        question: "DFA modelinde δ neyi temsil eder?",
        options: [
            { text: "Başlangıç durumu", isCorrect: false },
            { text: "Uç durumlar kümesi", isCorrect: false },
            { text: "Geçiş fonksiyonu", isCorrect: true },
            { text: "Durumlar kümesi", isCorrect: false },
        ],
    },
    {
        question: "DFA modelinde q0 neyi temsil eder?",
        options: [
            { text: "Başlangıç durumu", isCorrect: true },
            { text: "Uç durumlar kümesi", isCorrect: false },
            { text: "Giriş simgeleri kümesi", isCorrect: false },
            { text: "Geçiş fonksiyonu", isCorrect: false },
        ],
    },
    {
        question: "DFA modelinde F neyi temsil eder?",
        options: [
            { text: "Geçiş fonksiyonu", isCorrect: false },
            { text: "Başlangıç durumu", isCorrect: false },
            { text: "Uç durumlar kümesi", isCorrect: true },
            { text: "Durumlar kümesi", isCorrect: false },
        ],
    },
    {
        question: "Deterministik modelde, geçiş işlevi neyi eşler?",
        options: [
            { text: "(durum, giriş simgesi) çiftini bir duruma", isCorrect: true },
            { text: "Bir durumu bir giriş simgesine", isCorrect: false },
            { text: "Bir durumu birden çok duruma", isCorrect: false },
            { text: "Giriş simgesini bir duruma", isCorrect: false },
        ],
    },
    {
        question: "Deterministik olmayan sonlu özdevinir (NFA) tanımı nasıldır?",
        options: [
            { text: "NFA = <Q, Σ, δ, q0, F>", isCorrect: true },
            { text: "DFA = <Q, Σ, δ, q0, F>", isCorrect: false },
            { text: "NFA = <Q, Σ, q0, F>", isCorrect: false },
            { text: "DFA = <Q, δ, q0, F>", isCorrect: false },
        ],
    },
    {
        question: "NFA tanımında δ neyi temsil eder?",
        options: [
            { text: "(Q x Σ)’dan Q’ya bir eşleme", isCorrect: false },
            { text: "(Q x Σ)’dan Q’nun altkümelerine bir eşleme", isCorrect: true },
            { text: "Durumlar kümesi", isCorrect: false },
            { text: "Giriş alfabesi", isCorrect: false },
        ],
    },
    {
        question: "Deterministik olmayan modelde, bir durumdan bir giriş simgesi ile kaç duruma geçilebilir?",
        options: [
            { text: "Yalnızca bir", isCorrect: false },
            { text: "Sıfır, bir ya da birçok", isCorrect: true },
            { text: "En fazla iki", isCorrect: false },
            { text: "Yalnızca sıfır", isCorrect: false },
        ],
    },
    {
        question: "İki Yönlü Sonlu Otomata (2DFA) modelinde okuma kafası nasıl hareket eder?",
        options: [
            { text: "Sadece sağa", isCorrect: false },
            { text: "Sadece sola", isCorrect: false },
            { text: "Hem sağa hem sola", isCorrect: true },
            { text: "Rastgele", isCorrect: false },
        ],
    },
    {
        question: "2DFA tanımı nedir?",
        options: [
            { text: "2DFA = <Q, Σ, δ, q0, F>", isCorrect: true },
            { text: "DFA = <Q, Σ, δ, q0, F>", isCorrect: false },
            { text: "NFA = <Q, Σ, δ, q0, F>", isCorrect: false },
            { text: "FA = <Q, Σ, δ, q0, F>", isCorrect: false },
        ],
    },
    {
        question: "2DFA modelinde, geçiş fonksiyonu neyi eşler?",
        options: [
            { text: "(Q x Σ)’dan Q’ya", isCorrect: false },
            { text: "(Q x Σ)’dan Q x (R, L)’ye", isCorrect: true },
            { text: "Q’dan Σ’ya", isCorrect: false },
            { text: "Σ’dan Q’ya", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da 'R' neyi ifade eder?",
        options: [
            { text: "Sola hareket", isCorrect: false },
            { text: "Sağa hareket", isCorrect: true },
            { text: "Dur", isCorrect: false },
            { text: "Rastgele hareket", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da 'L' neyi ifade eder?",
        options: [
            { text: "Sağa hareket", isCorrect: false },
            { text: "Sola hareket", isCorrect: true },
            { text: "Dur", isCorrect: false },
            { text: "Rastgele hareket", isCorrect: false },
        ],
    },
    {
        question: "Hangi durumda 2DFA'da okuma kafası sonlu hareket sonunda dizginin sağına ulaşamaz?",
        options: [
            { text: "Hareketler döngü oluşturduğunda", isCorrect: true },
            { text: "Şerit çok uzun olduğunda", isCorrect: false },
            { text: "Giriş simgesi yanlış olduğunda", isCorrect: false },
            { text: "Başlangıç durumu hatalı olduğunda", isCorrect: false },
        ],
    },
    {
        question: "Anlık Tanım (ID) neyi gösteren bir üçlüdür?",
        options: [
            { text: "Makinenin giriş dizgisini, durumunu ve çıkışını", isCorrect: false },
            { text: "Makinenin bulunduğu durum ile giriş dizgisinin okuma kafasının solunda ve sağında kalan kesimlerini", isCorrect: true },
            { text: "Giriş dizgisinin solunu, sağını ve uzunluğunu", isCorrect: false },
            { text: "Makinenin başlangıç, bitiş ve anlık durumlarını", isCorrect: false },
        ],
    },
    {
        question: "Sonlu özdevinirlerin indirgenmesi ne anlama gelir?",
        options: [
            { text: "Durum sayısını artırmak", isCorrect: false },
            { text: "Giriş alfabesini değiştirmek", isCorrect: false },
            { text: "Aynı kümeyi kapsayan ve daha az durumdan oluşan makine bulmak", isCorrect: true },
            { text: "Çıkış fonksiyonunu değiştirmek", isCorrect: false },
        ],
    },
    {
        question: "Neden bir sonlu özdevinirin indirgenmesi önemli olabilir?",
        options: [
            { text: "Karmaşıklığı azaltmak için", isCorrect: true },
            { text: "Daha çok durum eklemek için", isCorrect: false },
            { text: "Giriş alfabesini genişletmek için", isCorrect: false },
            { text: "Çıkış sayısını artırmak için", isCorrect: false },
        ],
    },
    {
        question: "Aşağıdakilerden hangisi Mealy modelinin bir alt türü olarak görülebilir?",
        options: [
            { text: "NFA", isCorrect: false },
            { text: "DFA", isCorrect: false },
            { text: "Moore Makinesi", isCorrect: true },
            { text: "2DFA", isCorrect: false },
        ],
    },
    {
        question: "Bir M makinesinin S1 durumundan x giriş simgesi ile S2 durumuna geçiliyorsa, S2 için ne söylenebilir?",
        options: [
            { text: "S1’in x-önceli", isCorrect: false },
            { text: "S1’in x-ardılı", isCorrect: true },
            { text: "S1 ile denk", isCorrect: false },
            { text: "S1 ile ayırdedilebilir", isCorrect: false },
        ],
    },
    {
        question: "Deterministik modellerde, bir durumun x ve w ardılı nedir?",
        options: [
            { text: "Durumların bir altkümesidir", isCorrect: false },
            { text: "Her zaman tek bir durumdur", isCorrect: true },
            { text: "Birden çok durumdur", isCorrect: false },
            { text: "Giriş simgesine bağlıdır", isCorrect: false },
        ],
    },
    {
        question: "M makinesinin S1, S2, ..., Si durumlarından x giriş simgesi ile Sj durumuna geçiliyorsa, Sj için ne söylenebilir?",
        options: [
            { text: "x-ardılı {S1, S2, ..., Si} dir.", isCorrect: false },
            { text: "x-önceli {S1, S2, ..., Si} dir.", isCorrect: true },
            { text: "x-denkliği {S1, S2, ..., Si} dir.", isCorrect: false },
            { text: "x-ayırdedilebilirliği {S1, S2, ..., Si} dir.", isCorrect: false },
        ],
    },
    {
        question: "Bir durumun x ve w öncelleri deterministik modellerde ne tür bir kümedir?",
        options: [
            { text: "Tek bir durumdur", isCorrect: false },
            { text: "Durumların bir altkümesidir", isCorrect: true },
            { text: "Giriş simgelerinin kümesidir", isCorrect: false },
            { text: "Boş kümedir", isCorrect: false },
        ],
    },
    {
        question: "Hangi model, çıkış işlevi giriş alfabesinden bağımsız olan bir alt tür olarak görülebilir?",
        options: [
            { text: "Mealy", isCorrect: false },
            { text: "Moore", isCorrect: true },
            { text: "DFA", isCorrect: false },
            { text: "NFA", isCorrect: false },
        ],
    },
    {
        question: "Aşağıdakilerden hangisi bir sonlu özdevinir indirgeme yöntemi değildir?",
        options: [
            { text: "Denklik sınıflarını bulma", isCorrect: false },
            { text: "Ulaşılabilir durumları bulma", isCorrect: false },
            { text: "Gereksiz durumları çıkarma", isCorrect: false },
            { text: "Giriş alfabesini genişletme", isCorrect: true },
        ],
    },
    {
        question: "İki durum ne zaman denk olarak adlandırılır?",
        options: [
            { text: "Farklı sayıda ardılları varsa", isCorrect: false },
            { text: "Aynı sayıda öncelleri varsa", isCorrect: false },
            { text: "Herhangi bir w giriş dizgisi için aynı çıkış dizgisini üretiyorlarsa", isCorrect: true },
            { text: "Farklı sayıda duruma geçiş yapıyorlarsa", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da okuma kafası hangi yönde hareket edebilir?",
        options: [
            { text: "Sadece sağa", isCorrect: false },
            { text: "Sadece sola", isCorrect: false },
            { text: "Hem sağa hem sola", isCorrect: true },
            { text: "Rastgele", isCorrect: false },
        ],
    },
    {
        question: "Aşağıdakilerden hangisi 2DFA'nın tanımında yer almaz?",
        options: [
            { text: "Durumlar kümesi (Q)", isCorrect: false },
            { text: "Giriş alfabesi (Σ)", isCorrect: false },
            { text: "Çıkış fonksiyonu (λ)", isCorrect: true },
            { text: "Başlangıç durumu (q0)", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da geçiş fonksiyonu (δ) neyi eşler?",
        options: [
            { text: "(Q x Σ) -> Q", isCorrect: false },
            { text: "(Q x Σ) -> Q x {R, L}", isCorrect: true },
            { text: "Q -> Σ", isCorrect: false },
            { text: "Σ -> Q", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da 'R' neyi temsil eder?",
        options: [
            { text: "Sola hareket", isCorrect: false },
            { text: "Sağa hareket", isCorrect: true },
            { text: "Dur", isCorrect: false },
            { text: "Rastgele hareket", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da 'L' neyi temsil eder?",
        options: [
            { text: "Sağa hareket", isCorrect: false },
            { text: "Sola hareket", isCorrect: true },
            { text: "Dur", isCorrect: false },
            { text: "Rastgele hareket", isCorrect: false },
        ],
    },
    {
        question: "Hangi durumda 2DFA'da okuma kafası dizginin sağına ulaşamaz?",
        options: [
            { text: "Giriş dizgisi çok uzun olduğunda", isCorrect: false },
            { text: "Geçiş fonksiyonu tanımsız olduğunda", isCorrect: false },
            { text: "Hareketler döngü oluşturduğunda", isCorrect: true },
            { text: "Başlangıç durumu yanlış olduğunda", isCorrect: false },
        ],
    },
    {
        question: "Aşağıdakilerden hangisi 2DFA'nın bir sınırlamasıdır?",
        options: [
            { text: "Sadece sonlu sayıda durumu olabilir", isCorrect: false },
            { text: "Sadece tek yönlü hareket edebilir", isCorrect: true },
            { text: "Sadece düzenli dilleri tanıyabilir", isCorrect: false },
            { text: "Çıkış üretemez", isCorrect: false },
        ],
    },
    {
        question: "2DFA, DFA'dan daha güçlü müdür?",
        options: [
            { text: "Evet", isCorrect: false },
            { text: "Hayır", isCorrect: true },
            { text: "Bazen", isCorrect: false },
            { text: "Alakası yok", isCorrect: false },
        ],
    },
    {
        question: "2DFA'nın çalışma prensibi hangi kavrama dayanır?",
        options: [
            { text: "Yığın (stack)", isCorrect: false },
            { text: "Bant (tape)", isCorrect: true },
            { text: "Ağaç (tree)", isCorrect: false },
            { text: "Graf (graph)", isCorrect: false },
        ],
    },
    {
        question: "2DFA'lar ne tür problemleri çözmek için uygundur?",
        options: [
            { text: "Bağlamsız diller", isCorrect: false },
            { text: "Düzenli diller", isCorrect: true },
            { text: "Hesaplanamayan problemler", isCorrect: false },
            { text: "Doğrusal sınırlı otomata dilleri", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da bir durumdan diğerine geçişi ne belirler?",
        options: [
            { text: "Sadece mevcut durum", isCorrect: false },
            { text: "Sadece okunan giriş simgesi", isCorrect: false },
            { text: "Hem mevcut durum hem de okunan giriş simgesi", isCorrect: true },
            { text: "Önceki durum", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da okuma kafasının hareketi neye bağlıdır?",
        options: [
            { text: "Sadece mevcut durum", isCorrect: false },
            { text: "Sadece okunan giriş simgesi", isCorrect: false },
            { text: "Hem mevcut durum hem de okunan giriş simgesi", isCorrect: true },
            { text: "Giriş dizgisinin uzunluğu", isCorrect: false },
        ],
    },
    {
        question: "2DFA'lar, DFA'lar ile karşılaştırıldığında, hangi açıdan farklılık gösterir?",
        options: [
            { text: "Daha fazla duruma sahip olabilirler", isCorrect: false },
            { text: "Daha fazla giriş simgesi işleyebilirler", isCorrect: false },
            { text: "Okuma kafası çift yönlü hareket edebilir", isCorrect: true },
            { text: "Daha fazla sayıda uç duruma sahip olabilirler", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da bir döngü oluşursa ne olur?",
        options: [
            { text: "Makine durur", isCorrect: false },
            { text: "Giriş dizgisi kabul edilir", isCorrect: false },
            { text: "Okuma kafası sonsuz döngüye girer", isCorrect: true },
            { text: "Makine hata verir", isCorrect: false },
        ],
    },
    {
        question: "2DFA'nın sonlu denetim birimi neyi kontrol eder?",
        options: [
            { text: "Sadece okuma kafasının hareketini", isCorrect: false },
            { text: "Sadece mevcut durumu", isCorrect: false },
            { text: "Hem okuma kafasının hareketini hem de mevcut durumu", isCorrect: true },
            { text: "Giriş dizgisinin içeriğini", isCorrect: false },
        ],
    },
    {
        question: "Aşağıdakilerden hangisi 2DFA'nın kullanım alanlarından biridir?",
        options: [
            { text: "Derleyici tasarımı", isCorrect: true },
            { text: "Veritabanı yönetimi", isCorrect: false },
            { text: "Yapay zeka", isCorrect: false },
            { text: "İşletim sistemleri", isCorrect: false },
        ],
    },
    {
        question: "2DFA'lar, NFA'lar ile karşılaştırıldığında, hangi açıdan benzerlik gösterir?",
        options: [
            { text: "Her ikisi de deterministiktir", isCorrect: false },
            { text: "Her ikisi de aynı sayıda duruma sahiptir", isCorrect: false },
            { text: "Her ikisi de sonlu sayıda duruma sahiptir", isCorrect: true },
            { text: "Her ikisi de aynı geçiş fonksiyonuna sahiptir", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da bir durumdan birden fazla duruma geçiş olabilir mi?",
        options: [
            { text: "Evet, her zaman", isCorrect: false },
            { text: "Evet, bazı durumlarda", isCorrect: false },
            { text: "Hayır, asla", isCorrect: true },
            { text: "Duruma göre değişir", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da okuma kafası şeridin sonuna geldiğinde ne olur?",
        options: [
            { text: "Makine durur", isCorrect: true },
            { text: "Okuma kafası başa döner", isCorrect: false },
            { text: "Yeni bir şerit oluşturulur", isCorrect: false },
            { text: "Makine hata verir", isCorrect: false },
        ],
    },
    {
        question: "2DFA'lar hangi tür dilleri tanımak için kullanılır?",
        options: [
            { text: "Düzenli diller", isCorrect: true },
            { text: "Bağlamsız diller", isCorrect: false },
            { text: "Bağımlı diller", isCorrect: false },
            { text: "Hesaplanamayan diller", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da geçiş fonksiyonu tanımlanırken hangi bilgiler kullanılır?",
        options: [
            { text: "Sadece mevcut durum", isCorrect: false },
            { text: "Sadece okunan simge", isCorrect: false },
            { text: "Mevcut durum ve okunan simge", isCorrect: true },
            { text: "Önceki durum ve okunan simge", isCorrect: false },
        ],
    },
    {
        question: "2DFA'nın çalışma prensibi hangi matematiksel modele dayanır?",
        options: [
            { text: "Turing makinesi", isCorrect: false },
            { text: "Sonlu durum makinesi", isCorrect: true },
            { text: "Yığınlı otomat", isCorrect: false },
            { text: "Üretim grameri", isCorrect: false },
        ],
    },
    {
        question: "Aşağıdakilerden hangisi 2DFA'nın özelliklerinden biridir?",
        options: [
            { text: "Sınırsız sayıda duruma sahip olması", isCorrect: false },
            { text: "Okuma kafasının çift yönlü hareket edebilmesi", isCorrect: true },
            { text: "Çıkış üretebilmesi", isCorrect: false },
            { text: "Herhangi bir programlama diliyle yazılabilmesi", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da okuma kafası hangi durumlarda durur?",
        options: [
            { text: "Sadece şeridin sonuna geldiğinde", isCorrect: false },
            { text: "Sadece bir uç duruma ulaşıldığında", isCorrect: false },
            { text: "Şeridin sonuna gelindiğinde veya bir uç duruma ulaşıldığında", isCorrect: true },
            { text: "Hiçbir zaman durmaz", isCorrect: false },
        ],
    },
    {
        question: "2DFA'lar hangi tür problemleri çözmek için daha uygundur?",
        options: [
            { text: "Karmaşık matematiksel hesaplamalar", isCorrect: false },
            { text: "Doğal dil işleme", isCorrect: false },
            { text: "Desen tanıma", isCorrect: true },
            { text: "Veritabanı sorguları", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da bir geçiş nasıl gerçekleşir?",
        options: [
            { text: "Sadece mevcut durum değişir", isCorrect: false },
            { text: "Sadece okuma kafası hareket eder", isCorrect: false },
            { text: "Hem mevcut durum değişir hem de okuma kafası hareket eder", isCorrect: true },
            { text: "Sadece çıkış üretilir", isCorrect: false },
        ],
    },
    {
        question: "2DFA'lar, DFA'lara göre daha mı karmaşıktır?",
        options: [
            { text: "Evet", isCorrect: true },
            { text: "Hayır", isCorrect: false },
            { text: "Aynı karmaşıklıkta", isCorrect: false },
            { text: "Duruma göre değişir", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da okuma kafası hangi simgeleri okuyabilir?",
        options: [
            { text: "Sadece sayısal simgeleri", isCorrect: false },
            { text: "Sadece alfanümerik simgeleri", isCorrect: false },
            { text: "Giriş alfabesindeki herhangi bir simgeyi", isCorrect: true },
            { text: "Sadece özel karakterleri", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da bir durumun ardılı neyi ifade eder?",
        options: [
            { text: "Önceki durum", isCorrect: false },
            { text: "Sonraki durum", isCorrect: true },
            { text: "Başlangıç durumu", isCorrect: false },
            { text: "Uç durum", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da bir durumun önceli neyi ifade eder?",
        options: [
            { text: "Sonraki durum", isCorrect: false },
            { text: "Önceki durum", isCorrect: true },
            { text: "Başlangıç durumu", isCorrect: false },
            { text: "Uç durum", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da denklik kavramı ne anlama gelir?",
        options: [
            { text: "İki durumun aynı sayıda ardılı olması", isCorrect: false },
            { text: "İki durumun aynı sayıda önceli olması", isCorrect: false },
            { text: "İki durumun aynı giriş dizgisi için aynı çıkışı üretmesi", isCorrect: true },
            { text: "İki durumun aynı sayıda duruma geçiş yapması", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da ayırdedilebilirlik ne anlama gelir?",
        options: [
            { text: "İki durumun farklı sayıda ardılı olması", isCorrect: false },
            { text: "İki durumun farklı sayıda önceli olması", isCorrect: false },
            { text: "İki durumun farklı giriş dizgileri için farklı çıkışlar üretmesi", isCorrect: true },
            { text: "İki durumun farklı sayıda duruma geçiş yapması", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da indirgeme işlemi ne amaçla yapılır?",
        options: [
            { text: "Durum sayısını artırmak", isCorrect: false },
            { text: "Giriş alfabesini değiştirmek", isCorrect: false },
            { text: "Daha az durumla aynı işlevi gören makine elde etmek", isCorrect: true },
            { text: "Çıkış fonksiyonunu değiştirmek", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da hangi durumda okuma kafası hareket etmez?",
        options: [
            { text: "Sadece başlangıç durumunda", isCorrect: false },
            { text: "Sadece uç durumda", isCorrect: false },
            { text: "Herhangi bir durumda hareket edebilir", isCorrect: true },
            { text: "Sadece döngü durumunda", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da bir durumun x-ardılı ne demektir?",
        options: [
            { text: "O durumdan x ile önceki duruma geçiş", isCorrect: false },
            { text: "O durumdan x ile sonraki duruma geçiş", isCorrect: true },
            { text: "O durumun x ile aynı duruma geçmesi", isCorrect: false },
            { text: "O durumdan x ile herhangi bir duruma geçiş olmaması", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da bir durumun x-önceli ne demektir?",
        options: [
            { text: "O durumdan x ile sonraki duruma geçiş", isCorrect: false },
            { text: "O duruma x ile önceki durumdan geçiş", isCorrect: true },
            { text: "O durumun x ile aynı duruma geçmesi", isCorrect: false },
            { text: "O duruma x ile herhangi bir durumdan geçiş olmaması", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da denklik sınıfları neyi ifade eder?",
        options: [
            { text: "Aynı sayıda ardılı olan durumlar kümesi", isCorrect: false },
            { text: "Aynı sayıda önceli olan durumlar kümesi", isCorrect: false },
            { text: "Aynı giriş dizgisi için aynı çıkışı veren durumlar kümesi", isCorrect: true },
            { text: "Aynı sayıda duruma geçiş yapan durumlar kümesi", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da indirgeme işlemi sırasında ne korunur?",
        options: [
            { text: "Durum sayısı", isCorrect: false },
            { text: "Giriş alfabesi", isCorrect: false },
            { text: "Makinenin tanıdığı dil", isCorrect: true },
            { text: "Çıkış fonksiyonu", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da bir durumun w-ardılı ne demektir?",
        options: [
            { text: "O durumdan w giriş dizgisi ile önceki duruma geçiş", isCorrect: false },
            { text: "O durumdan w giriş dizgisi ile sonraki duruma geçiş", isCorrect: true },
            { text: "O durumun w giriş dizgisi ile aynı duruma geçmesi", isCorrect: false },
            { text: "O durumdan w giriş dizgisi ile herhangi bir duruma geçiş olmaması", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da bir durumun w-önceli ne demektir?",
        options: [
            { text: "O durumdan w giriş dizgisi ile sonraki duruma geçiş", isCorrect: false },
            { text: "O duruma w giriş dizgisi ile önceki durumdan geçiş", isCorrect: true },
            { text: "O durumun w giriş dizgisi ile aynı duruma geçmesi", isCorrect: false },
            { text: "O duruma w giriş dizgisi ile herhangi bir durumdan geçiş olmaması", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da indirgeme işlemi ne zaman durdurulur?",
        options: [
            { text: "Durum sayısı en az seviyeye indiğinde", isCorrect: false },
            { text: "Giriş alfabesi değiştiğinde", isCorrect: false },
            { text: "Denklik sınıfları değişmediğinde", isCorrect: true },
            { text: "Çıkış fonksiyonu değiştiğinde", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da bir durumun x ve w ardılları hangi kümeyi oluşturur?",
        options: [
            { text: "Tek bir durum", isCorrect: true },
            { text: "Durumların bir altkümesi", isCorrect: false },
            { text: "Giriş simgelerinin kümesi", isCorrect: false },
            { text: "Boş küme", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da bir durumun x ve w öncelleri hangi kümeyi oluşturur?",
        options: [
            { text: "Tek bir durum", isCorrect: false },
            { text: "Durumların bir altkümesi", isCorrect: true },
            { text: "Giriş simgelerinin kümesi", isCorrect: false },
            { text: "Boş küme", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da hangi tür durumlar indirgeme işlemine dahil edilmez?",
        options: [
            { text: "Başlangıç durumları", isCorrect: false },
            { text: "Uç durumları", isCorrect: false },
            { text: "Ulaşılamayan durumlar", isCorrect: true },
            { text: "Tüm durumlar dahil edilir", isCorrect: false },
        ],
    },
    {
        question: "2DFA'da indirgeme işlemi sonucunda elde edilen makine neye denktir?",
        options: [
            { text: "Daha fazla duruma sahip makineye", isCorrect: false },
            { text: "Farklı giriş alfabesine sahip makineye", isCorrect: false },
            { text: "Aynı dili tanıyan daha az duruma sahip makineye", isCorrect: true },
            { text: "Farklı çıkış fonksiyonuna sahip makineye", isCorrect: false },
        ],
    },
];
const QuizApp = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(quizData.length).fill(null));
    const [quizStarted, setQuizStarted] = useState(false);

    const handleAnswerSelection = (index: number) => {
        setSelectedAnswer(index);
        setUserAnswers(prev => {
            const updated = [...prev];
            updated[currentQuestion] = index;
            return updated;
        });
    };

    const handleNextQuestion = () => {
        if (selectedAnswer === null) return;
        const isCorrect = quizData[currentQuestion].options[selectedAnswer].isCorrect;
        if (isCorrect) setScore(prev => prev + 1);

        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
        } else {
            setIsFinished(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setIsFinished(false);
        setSelectedAnswer(null);
        setUserAnswers(Array(quizData.length).fill(null));
        setQuizStarted(false);
    };

    useEffect(() => {
        const handleEnter = (e: KeyboardEvent) => {
            if (e.key === "Enter" && selectedAnswer !== null && !isFinished) {
                handleNextQuestion();
            }
        };
        window.addEventListener("keydown", handleEnter);
        return () => window.removeEventListener("keydown", handleEnter);
    }, [selectedAnswer, currentQuestion, isFinished]);

    const getAnswerStyle = (index: number) => {
        if (userAnswers[currentQuestion] === null) return "bg-white/5 hover:bg-white/10 text-white";
        if (userAnswers[currentQuestion] === index) {
            return quizData[currentQuestion].options[index].isCorrect
                ? "bg-green-600/30 text-green-300 border-green-500"
                : "bg-red-600/30 text-red-300 border-red-500";
        }
        return "bg-white/5 hover:bg-white/10 text-white";
    };

    const getResultIcon = (isCorrect: boolean | null | undefined) => {
        if (isCorrect == null) return null;
        return isCorrect
            ? <CheckCircle className="h-5 w-5 text-green-400" />
            : <XCircle className="h-5 w-5 text-red-400" />;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-6 flex items-center justify-center">
            <div className="w-full max-w-3xl">
                <h1 className="text-4xl sm:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8">
                    Finite Automata Quiz
                </h1>

                {!quizStarted ? (
                    <Card className="bg-gradient-to-br from-purple-900/50 to-gray-900/40 backdrop-blur-md border border-white/10 shadow-2xl rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl text-white">Start Quiz</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-300 mb-4">This quiz contains {quizData.length} questions on Finite Automata.</p>
                            <Button onClick={() => setQuizStarted(true)} className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl py-2 hover:brightness-110">
                                Start
                            </Button>
                        </CardContent>
                    </Card>
                ) : isFinished ? (
                    <Card className="bg-gradient-to-br from-purple-900/50 to-gray-900/40 backdrop-blur-md border border-white/10 shadow-2xl rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl text-white">Quiz Finished!</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-gray-300 text-lg">Your Score: {score} / {quizData.length}</p>
                            <p className={cn("text-xl font-semibold", score >= quizData.length * 0.8 ? "text-green-400" : "text-yellow-400")}>
                                {score === quizData.length ? "Perfect Score!" : score >= quizData.length * 0.8 ? "Great Job!" : "Keep Studying!"}
                            </p>
                            <Button onClick={resetQuiz} className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl py-2 hover:brightness-110">
                                Restart
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="bg-gradient-to-br from-purple-900/50 to-gray-900/40 backdrop-blur-md border border-white/10 shadow-2xl rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl text-white">Question {currentQuestion + 1} / {quizData.length}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <p className="text-white text-lg">{quizData[currentQuestion].question}</p>
                            <div className="space-y-4">
                                {quizData[currentQuestion].options.map((option, index) => (
                                    <Label
                                        key={index}
                                        onClick={() => handleAnswerSelection(index)}
                                        className={cn(
                                            "block p-4 rounded-xl border cursor-pointer transition-all duration-200 shadow-md",
                                            getAnswerStyle(index),
                                            userAnswers[currentQuestion] !== null && "pointer-events-none"
                                        )}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            {option.text}
                                            {userAnswers[currentQuestion] !== null && getResultIcon(option.isCorrect)}
                                        </div>
                                    </Label>
                                ))}
                            </div>

                            {selectedAnswer === null && (
                                <p className="text-yellow-400 text-sm italic flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4" /> Select an answer to continue
                                </p>
                            )}

                            <Button
                                onClick={handleNextQuestion}
                                disabled={selectedAnswer === null}
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl py-2 hover:brightness-110"
                            >
                                {currentQuestion === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
                            </Button>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default QuizApp;