const gulp = require("gulp");
const bump = require("gulp-bump");
const fs = require("fs");
const replace = require("gulp-replace");
const eslint = require("gulp-eslint");
const { execSync } = require("child_process");

// Lint Task (Fails on ESLint errors)
gulp.task("lint", async function () {
  return gulp
    .src(["src/**/*.ts", "src/**/*.js"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()); // Fail if any error is found
});

// Run Tests
gulp.task("test", function (done) {
  try {
    execSync("npm test", { stdio: "inherit" }); // Replace with your test command
    done();
  } catch (error) {
    console.error("❌ Tests failed:", error);
    process.exit(1);
  }
});

// Task to bump version (Only for Publish)
gulp.task("bump-version", function (done) {
  const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
  const currentVersion = packageJson.version;

  if (!/^0\.0\.\d+$/.test(currentVersion)) {
    console.error("❌ Version bump halted: Only patch updates are allowed while in 0.0.x!");
    process.exit(1);
  }

  return gulp
    .src("./package.json")
    .pipe(bump({ type: "patch" }))
    .pipe(gulp.dest("./"))
    .on("end", done);
});

// Task to update version in README.md (Only for Publish)
gulp.task("update-readme", function () {
  const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
  const newVersion = packageJson.version;

  return gulp
    .src("README.md")
    .pipe(replace(/(###\s*)0\.0\.\d+/g, `$1${newVersion}`)) // Updates the latest release
    .pipe(gulp.dest("./"));
});

// Task to package the VS Code extension
gulp.task("package", function (done) {
  try {
    execSync("vsce package", { stdio: "inherit" });
    done();
  } catch (error) {
    console.error("❌ Packaging failed:", error);
    process.exit(1);
  }
});

// Task to publish the VS Code extension (Only for Publish)
gulp.task("vsce-publish", function (done) {
  try {
    execSync("vsce publish", { stdio: "inherit" });
    done();
  } catch (error) {
    console.error("❌ Publishing failed:", error);
    process.exit(1);
  }
});

// 🧪 Test Mode (Lint + Tests)
gulp.task("test", gulp.series("lint", "test"));

// 🛠️ Dev Mode (Lint + Tests + Package)
gulp.task("dev", gulp.series("lint", "test", "package"));

// 🚀 Publish Mode (Full Release Pipeline)
gulp.task(
  "publish",
  gulp.series("lint", "test", "bump-version", "update-readme", "package", "vsce-publish")
);
