import { Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "./nav-bar/nav-bar";
import { ContactForm } from "./contact-form/contact-form";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Footer } from "./footer/footer";
import { VisitUs } from "./visit-us/visit-us";
import { CallBackForm } from "./call-back-form/call-back-form";
import { PopupForm } from "./popup-form/popup-form";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, ContactForm, FormsModule, CommonModule, Footer, VisitUs, CallBackForm, PopupForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('sapiens-hand-surgery');
  @ViewChild('triggerSection') triggerSection!: ElementRef;

  perform = [
    {
      img: "/imgs/perform-img-1.png",
      heading: "Hand Surgeries We Perform",
      para: "Surgical fixation of hand and wrist fractures to restore alignment, stability and function."
    },
    {
      img: "/imgs/perform-img-2.png",
      heading: "Tendon Repair Surgery",
      para: "Repair of damaged flexor or extensor tendons to restore finger movement and grip strength."
    },
    {
      img: "/imgs/perform-img-3.png",
      heading: "Peripheral Nerve Surgery",
      para: "Microsurgical treatment for nerve compression or nerve injuries affecting sensation and coordination."
    },
  ]

  faqs = [
    {
      question: 'Is hand surgery safe?',
      answer: 'Yes. When performed by an experienced hand surgeon after proper evaluation, hand surgery is generally safe.'
    },
    {
      question: 'Will hand surgery be painful?',
      answer: 'Post-surgical pain is usually well managed with medications and supportive care.'
    },
    {
      question: 'How long does recovery take after hand surgery?',
      answer: 'Recovery depends on the condition treated. Healing may take weeks to months, especially after fractures or tendon repairs.'
    },
    {
      question: 'Is physiotherapy required after hand surgery?',
      answer: ' Yes. Hand therapy is often essential to regain strength, flexibility, and coordination.'
    },
    {
      question: 'When can I return to work after hand surgery?',
      answer: 'This depends on your job type and recovery progress. Your surgeon will guide you during follow-ups.'
    },
    {
      question: 'Is surgery always needed for hand problems?',
      answer: ' No. Many hand conditions improve with non-surgical treatment. Surgery is advised only when conservative care does not provide relief.'
    },
  ];

  ngOnInit() {
    const popupClosed = localStorage.getItem('popupClosed');

    if (!popupClosed) {
      setTimeout(() => {
        this.openPopup();
      }, 500); // small delay for smooth UX
    } else {
      this.showFloatingIcon = true;
    }
  }

  activeIndex: number | null = null;
  popupClosed = false;
  popupTriggered = false;
  showFloatingIcon = false;
    showMessageCard = false;
  hideMessageAnimation = false;

  toggleFAQ(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  isPopupOpen = false;

  openPopup() {
    this.isPopupOpen = true;
    this.showFloatingIcon = false;
  }

 closePopup() {
    this.isPopupOpen = false;
    this.showFloatingIcon = true;

    // show message
    this.showMessageCard = true;
    this.hideMessageAnimation = false;

    // start fade out after 4 sec
    setTimeout(() => {
      this.hideMessageAnimation = true;
    }, 4000);

    // remove element after animation
    setTimeout(() => {
      this.showMessageCard = false;
    }, 5000);

     localStorage.setItem('popupClosed', 'true');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {

    if (!this.triggerSection || this.popupTriggered || this.popupClosed) return;

    const rect = this.triggerSection.nativeElement.getBoundingClientRect();

    if (rect.bottom <= window.innerHeight) {
      this.openPopup();
      this.popupTriggered = true;
    }
  }

}
