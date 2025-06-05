import { useState } from "react";

/**
 * @name ModalHook
 * @function
 * @description manage state of a modal
 *
 * @param defaultValue default value of the component
 */
export function ModalHook(defaultVale = false) {
  const [isModalOpen, setIsModalOpen] = useState(defaultVale);

  const toggleModal = (value?: boolean) =>
    setIsModalOpen((prev) => (value !== undefined ? value : !prev));
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return { isModalOpen, openModal, closeModal, toggleModal };
}
