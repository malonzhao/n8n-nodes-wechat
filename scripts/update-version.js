const { execSync } = require('child_process');

// Get the last tag
let lastTag;
try {
  lastTag = execSync('git describe --tags --abbrev=0', { encoding: 'utf8' }).trim();
} catch (e) {
  // No tags yet
  lastTag = null;
}

// Get commits since last tag or from beginning
const range = lastTag ? `${lastTag}..HEAD` : 'HEAD';
const commits = execSync(`git log --oneline --no-merges ${range}`, { encoding: 'utf8' })
  .split('\n')
  .filter(line => line.trim());

let bump = null;
for (const commit of commits) {
  const subject = commit.split(' ').slice(1).join(' ');
  if (subject.includes('BREAKING CHANGE') || subject.includes('!')) {
    bump = 'major';
    break;
  } else if (subject.startsWith('feat')) {
    bump = 'minor';
  } else if (subject.startsWith('fix') && bump !== 'minor') {
    bump = 'patch';
  }
}

if (bump) {
  console.log(bump);
} else {
  process.exit(1); // No bump needed
}
