interface ShortcutsListProps {
  [x: string]: () => void;
}

interface ShortcutsProps {
  internal?: ShortcutsListProps;
  external?: ShortcutsListProps;
  enableFocusOnNumbers?: boolean;
}

export function handleShortcuts(
  shortcuts: ShortcutsProps,
  id: string,
  event: any
) {
  //internal node key shortcuts (ctrl)
  let internalShortcuts: { [x: string]: () => void } = {};

  // external node key shortcuts (ctrl + shift)
  let externalShortcuts: { [x: string]: () => void } = {};

  if (shortcuts.internal) {
    for (const [key, value] of Object.entries(shortcuts.internal)) {
      internalShortcuts[key.toLowerCase()] = value;
    }
  }

  if (shortcuts.external) {
    for (const [key, value] of Object.entries(shortcuts.external)) {
      externalShortcuts[key.toLowerCase()] = value;
    }
  }

  if (shortcuts.enableFocusOnNumbers) {
    for (let i = 1; i <= 9; i++) {
      internalShortcuts[i] = () => {
        document.getElementById(`${id}-${i - 1}`)?.focus();
      };
    }
  }

  const key = event.key.toLowerCase();
  const ctrlKey = event.ctrlKey;
  const shiftKey = event.shiftKey;

  let selectedShortcuts =
    ctrlKey && shiftKey ? externalShortcuts : ctrlKey ? internalShortcuts : {};

  if (Object.keys(selectedShortcuts).includes(key)) {
    event.preventDefault();
    selectedShortcuts[key]();
  }
}
