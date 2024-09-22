function changeLanguage() {
    const lang = document.getElementById('language').value;
    document.querySelectorAll('.lang-en, .lang-ar').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('.lang-' + lang).forEach(el => {
        el.style.display = '';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculatorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const totalNumbers = parseInt(document.getElementById('totalNumbers').value);
        const channels = parseInt(document.getElementById('channels').value);
        const minDelay = parseInt(document.getElementById('minDelay').value);
        const maxDelay = parseInt(document.getElementById('maxDelay').value);
        const batchSize = parseInt(document.getElementById('batchSize').value);
        const batchMinDelay = parseInt(document.getElementById('batchMinDelay').value);
        const batchMaxDelay = parseInt(document.getElementById('batchMaxDelay').value);
        
        const numbersPerChannel = Math.floor(totalNumbers / channels);
        const remainingNumbers = totalNumbers % channels;
        
        const lang = document.getElementById('language').value;
        let results = `<h2>${lang === 'en' ? 'Distribution Results:' : 'نتائج التوزيع:'}</h2>`;
        results += `<p>${lang === 'en' ? 'Numbers per channel:' : 'الأرقام لكل قناة:'} ${numbersPerChannel}</p>`;
        if (remainingNumbers > 0) {
            results += `<p>${lang === 'en' ? 'Remaining numbers:' : 'الأرقام المتبقية:'} ${remainingNumbers} (${lang === 'en' ? 'distribute manually' : 'وزع يدويًا'})</p>`;
        }
        
        const avgDelay = (minDelay + maxDelay) / 2;
        const avgBatchDelay = (batchMinDelay + batchMaxDelay) / 2;
        const totalTime = (numbersPerChannel * avgDelay + Math.floor(numbersPerChannel / batchSize) * avgBatchDelay) / 60; // in minutes
        
        results += `<p>${lang === 'en' ? 'Estimated time per channel:' : 'الوقت المقدر لكل قناة:'} ${totalTime.toFixed(2)} ${lang === 'en' ? 'minutes' : 'دقيقة'}</p>`;
        
        document.getElementById('results').innerHTML = results;
        
        // Update delay settings display
        document.getElementById('batchDelayDisplay').textContent = `${batchMinDelay} to ${batchMaxDelay}`;
        document.getElementById('batchSizeDisplay').textContent = batchSize;
        document.getElementById('messageDelayDisplay').textContent = `${minDelay} to ${maxDelay}`;
        document.getElementById('batchDelayDisplayAr').textContent = `${batchMinDelay} إلى ${batchMaxDelay}`;
        document.getElementById('batchSizeDisplayAr').textContent = batchSize;
        document.getElementById('messageDelayDisplayAr').textContent = `${minDelay} إلى ${maxDelay}`;
        
        // Create a bar chart
        const ctx = document.getElementById('distributionChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Array.from({length: channels}, (_, i) => `${lang === 'en' ? 'Channel' : 'قناة'} ${i+1}`),
                datasets: [{
                    label: lang === 'en' ? 'Numbers per Channel' : 'الأرقام لكل قناة',
                    data: Array(channels).fill(numbersPerChannel),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
});
